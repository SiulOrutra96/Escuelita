import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';

import { Maestro } from '../models/maestro.model';
import { MaestrosService } from '../services/maestros.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioAutenticado = false;
  private usuario = new BehaviorSubject<Maestro>(undefined);

  constructor(
    private firebaseAuth: AngularFireAuth,
    private maestrosService: MaestrosService
  ) {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      this._usuarioAutenticado = user !== null;
      console.log('uA: ', this._usuarioAutenticado);
      console.log('u: ', user);
      if (user) {
        this.maestrosService.obtenerMaestro(user.uid).pipe(take(1)).toPromise().then(maestro => {
          console.log('maestro: ', maestro);
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

  usuarioAutenticado() {
    return this._usuarioAutenticado;
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
