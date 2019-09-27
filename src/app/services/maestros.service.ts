import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Maestro } from '../models/maestro.model';


@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  private maestros: AngularFirestoreCollection<Maestro>;

  constructor(private firestore: AngularFirestore) {
    this.maestros = this.firestore.collection<Maestro>('maestros');
  }

  obtenerMaestros() {
    return this.firestore.collection<Maestro>('maestros', ref => {
      return ref.orderBy('nombre');
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

  obtenerMaestro(maestroId: string) {
    return this.firestore.collection<Maestro>('maestros', ref => {
      return ref.where('id', '==', maestroId);
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const datos = a.payload.doc.data();
          return { ...datos };
        })[0];
      })
    );
  }

  agregarMaestro(maestro: Maestro) {
    const params = JSON.parse(JSON.stringify(maestro));
    return this.maestros.add(params);
  }

  actualizarMaestro(maestro: Maestro) {
    const params = {};

    for (const key in maestro) {
      if (key !== 'id') {
        params[key] = maestro[key];
      }
    }

    return this.maestros.doc(maestro.id).update(params);
  }

  eliminarMaestro(maestro: Maestro) {
    return this.maestros.doc(maestro.id).delete();
  }
}
