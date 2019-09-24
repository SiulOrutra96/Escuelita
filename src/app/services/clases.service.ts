import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Clase } from '../models/clase.model';
import { AlumnosService } from './alumnos.service';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private clases: AngularFirestoreCollection<Clase>;

  constructor(private firestore: AngularFirestore) {
    this.clases = this.firestore.collection<Clase>('clases');
  }

  obtenerClases() {
    return this.firestore.collection<Clase>('clases', ref => {
      return ref.orderBy('grupo.nombre');
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

  obtenerClasesPorGrupo(grupoId: string) {
    return this.firestore.collection<Clase>('clases', ref => {
      return ref.where('grupo.id', '==', grupoId);
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

  obtenerClase(claseId: string) {
    return this.clases.doc<Clase>(claseId).valueChanges().pipe(map(clase => {
      return {id: claseId, ...clase};
    }));
  }

  agregarClase(clase: Clase) {
    const params = JSON.parse(JSON.stringify(clase));
    return this.clases.add(params);
  }

  actualizarClase(clase: Clase) {
    const params = {};

    for (const key in clase) {
      if (key !== 'id') {
        params[key] = clase[key];
      }
    }

    return this.clases.doc(clase.id).update(params);
  }

  eliminarClase(clase: Clase) {
    return this.clases.doc(clase.id).delete();
  }
}
