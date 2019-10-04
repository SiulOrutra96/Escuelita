import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Grupo } from '../models/grupo.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private grupos: AngularFirestoreCollection<Grupo>;

  constructor(private firestore: AngularFirestore) {
    this.grupos = this.firestore.collection<Grupo>('grupos');
  }

  obtenerGrupos() {
    return this.firestore.collection<Grupo>('grupos', ref => {
      return ref.orderBy('nombre');
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const datos = a.payload.doc.data();
          return {id, ...datos};
        });
      })
    );
  }

  obtenerGrupo(grupoId: string) {
    return this.grupos.doc<Grupo>(grupoId).valueChanges().pipe(map(grupo => {
      return {id: grupoId, ...grupo};
    }));
  }

  agregarGrupo(grupo: Grupo) {
    const params = JSON.parse(JSON.stringify(grupo));
    return this.grupos.add(params);
  }

  actualizarGrupo(grupo: Grupo) {
    const params = {};

    for (const key in grupo) {
      if (key !== 'id') {
        params[key] = grupo[key];
      }
    }

    return this.grupos.doc(grupo.id).update(params);
  }

  eliminarGrupo(grupoId: string) {
    return this.grupos.doc(grupoId).delete();
  }
}
