import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario = new BehaviorSubject<Usuario>(undefined);

  constructor(
    private firebaseAuth: AngularFireAuth,
    private usuariosService: UsuariosService
  ) {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.usuariosService.obtenerUsuario(user.uid).pipe(take(1)).toPromise().then(maestro => {
          console.log('usuario: ', maestro);
          this.usuario.next(maestro);
        });
      } else {
        this.usuario.next(undefined);
      }
    });
  }

  usuarioActual() {
    return this.usuario.asObservable();
  }

  crearUsuario(email: string, contrasenia: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, contrasenia);
  }

  iniciarSesion(email: string, contrasenia: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, contrasenia);
  }

  cerrarSesion() {
    return this.firebaseAuth.auth.signOut();
  }
}
