import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: AngularFirestoreCollection<Usuario>;

  constructor(private firestore: AngularFirestore) {
    this.usuarios = this.firestore.collection<Usuario>('usuarios');
  }

  obtenerUsuarios() {
    return this.firestore.collection<Usuario>('usuarios', ref => {
      return ref.orderBy('rol').orderBy('nombre');
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const datos = a.payload.doc.data();
          return { id, ...datos };
        });
      })
    );
  }

  obtenerMaestros() {
    return this.firestore.collection<Usuario>('usuarios', ref => {
      return ref.where('role', '==', 1).orderBy('nombre');
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const datos = a.payload.doc.data();
          return { id, ...datos };
        });
      })
    );
  }

  obtenerUsuario(usuarioId: string) {
    return this.firestore.collection<Usuario>('usuarios', ref => {
      return ref.where('id', '==', usuarioId);
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const datos = a.payload.doc.data();
          return { ...datos };
        })[0];
      })
    );
  }

  agregarUsuario(usuario: Usuario) {
    const params = JSON.parse(JSON.stringify(usuario));
    return this.usuarios.add(params);
  }

  actualizarMaestro(usuario: Usuario) {
    const params = {};

    for (const key in usuario) {
      if (key !== 'id') {
        params[key] = usuario[key];
      }
    }

    return this.usuarios.doc(usuario.id).update(params);
  }

  eliminarMaestro(usuario: Usuario) {
    return this.usuarios.doc(usuario.id).delete();
  }
}
