import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';

import { Fecha } from '../models/fecha.model';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  private fechas: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.fechas = this.firestore.collection<Fecha>('fechas');
  }

  obtenerFechas() {
    return this.firestore.collection<Fecha>('fechas', ref => {
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

  obtenerFechasHabiles() {
    return this.firestore.collection<Fecha>('fechas', ref => {
      return ref.where('habil', '==', true).orderBy('nombre');
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
  obtenerFechasHabilesDesdeHoy() {
    const hoy = new Date();
    const hoyString = this.deFechaAString(hoy);
    return this.firestore.collection<Fecha>('fechas', ref => {
      return ref.where('habil', '==', true).where('nombre', '>=', hoyString).orderBy('nombre');
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

  obtenerFechasInhabiles() {
    return this.firestore.collection<Fecha>('fechas', ref => {
      return ref.where('habil', '==', false).orderBy('nombre');
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

  agregarFecha(fecha: Fecha) {
    const params = JSON.parse(JSON.stringify(fecha));
    return this.fechas.add(params);
  }

  actualizarFecha(fecha: Fecha) {
    const params = {};

    for (const key in fecha) {
      if (key !== 'id') {
        params[key] = fecha[key];
      }
    }

    return this.fechas.doc<Fecha>(fecha.id).update(params);
  }

  eliminarFecha(fechaId: string) {
    return this.fechas.doc(fechaId).delete();
  }

  deStringAHora(horaString: string) {
    const tiempo = horaString.split(':');
    let hora = new Date();
    hora.setHours(+tiempo[0]);
    hora.setMinutes(+tiempo[1]);
    hora.setSeconds(0);
    hora.setMilliseconds(0);

    return hora;
  }

  deHoraAString(hora: Date) {
    let horaString = hora.getHours() < 10 ? '0' + hora.getHours() : '' + hora.getHours();
    horaString += hora.getMinutes() < 10 ? ':0' + hora.getMinutes() : ':' + hora.getMinutes();

    return horaString;
  }

  deFechaAString(fecha: Date) {
    let fechaString = fecha.getFullYear() + '-';
    fechaString += (fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : + (fecha.getMonth() + 1);
    fechaString += fecha.getDate() < 10 ? '-0' + fecha.getDate() : '-' + fecha.getDate();

    return fechaString;
  }

  calcularFechasHabiles() {
    // si la fecha es 0 es domingo
    // si la fecha es 6 es sábado

    this.obtenerFechasInhabiles().pipe(take(1)).subscribe(fechasNoHabiles => {
      let vacaciones = [];
      let fechasInhabiles = [];
      let fecha: Date;

      // se agregan los días no hábiles y vacaciones
      fechasNoHabiles.forEach(f => {
        if (f.inicioVacaciones || f.finVacaciones) {
          vacaciones.push(f.nombre);
        }
        fechasInhabiles.push(f.nombre);
      });

      // primer día del calendario escolar 1 de agosto
      const primerFecha = fechasInhabiles[0].split('-');
      fecha = new Date(+primerFecha[0], (+primerFecha[1] - 1), +primerFecha[2], 0, 0, 0, 0);

      // última fecha
      const ultimaFechaString = fechasInhabiles[fechasInhabiles.length - 1].split('-');
      let ultimaFecha = new Date(+ultimaFechaString[0], (+ultimaFechaString[1] - 1), +ultimaFechaString[2], 0, 0, 0, 0);
      ultimaFecha = new Date(ultimaFecha.getTime() + 24 * 60 * 60 * 1000);

      do {
        const fechaString = this.deFechaAString(fecha);
        // no son vacaciones
        if (vacaciones.indexOf(fechaString) < 0) {
          // no es domingo ni sábado
          if (fecha.getDay() !== 0 && fecha.getDay() !== 6) {
            // no es inhabil, o sea, es habil
            if (fechasInhabiles.indexOf(fechaString) < 0) {
              const nuevaFecha = new Fecha(fechaString, true, false, false, fecha.getDay());
              this.agregarFecha(nuevaFecha);
            }
          }
          // se agrega un día en milisegundos
          const milisegundos = fecha.getTime() + 24 * 60 * 60 * 1000;
          fecha = new Date(milisegundos);
        } else {
          const fechaFinString = vacaciones[vacaciones.indexOf(fechaString) + 1];
          const fechaSeparada = fechaFinString.split('-');
          const fechaFin = new Date(+fechaSeparada[0], (+fechaSeparada[1] - 1), +fechaSeparada[2], 0, 0, 0, 0);
          const milisegundos = fechaFin.getTime() + 24 * 60 * 60 * 1000;
          fecha = new Date(milisegundos);
        }
      } while (this.deFechaAString(fecha) !==  this.deFechaAString(ultimaFecha));
    });
  }
}
