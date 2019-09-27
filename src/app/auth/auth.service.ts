import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Maestro } from '../models/maestro.model';
import { MaestrosService } from '../services/maestros.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioAutenticado = new BehaviorSubject<boolean>(false);
  private _usuarioId = new BehaviorSubject<string>(undefined);
  private usuario = new BehaviorSubject<Maestro>(undefined);

  constructor(
    private firebaseAuth: AngularFireAuth,
    private maestrosService: MaestrosService
  ) {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log('mmm: ', user.uid);
        this._usuarioAutenticado.next(true);
        this._usuarioId.next(user.uid);
        this.maestrosService.obtenerMaestro(user.uid).pipe(take(1)).toPromise().then(user => {
          this.usuario.next(user);
        });
      } else {
        this._usuarioAutenticado.next(false);
        this._usuarioId.next(undefined);
        this.usuario.next(undefined);
      }
    });
  }

  usuarioActual() {
    return this.usuario.asObservable();
  }

  usuarioId() {
    return this._usuarioId.asObservable();
  }
  usuarioAutenticado() {
    return this._usuarioAutenticado.asObservable();
  }

  crearUsuario(email: string, contrasenia: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, contrasenia);
  }

  iniciarSesion(email: string, contrasenia: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, contrasenia).then(datos => {
      return this.maestrosService.obtenerMaestro(datos.user.uid).pipe(take(1)).toPromise();
    });
  }

  cerrarSesion() {
    return this.firebaseAuth.auth.signOut();
  }
}
