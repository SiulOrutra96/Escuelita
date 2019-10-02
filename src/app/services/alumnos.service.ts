import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Alumno, ClaseAlumno } from '../models/alumno.model';
import { Grupo } from '../models/grupo.model';
import { FechasService } from './fechas.service';
import { Clase } from '../models/clase.model';
import { Fecha } from '../models/fecha.model';
import { ClasesService } from './clases.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private alumnos: AngularFirestoreCollection<Alumno>;

  constructor(
    private firestore: AngularFirestore,
    private clasesService: ClasesService,
    private fechasService: FechasService
  ) {
    this.alumnos = this.firestore.collection<Alumno>('alumnos');
  }

  obtenerAlumnos() {
    return this.firestore.collection<Alumno>('alumnos', ref => {
      return ref.orderBy('activo', 'desc').orderBy('numeroLista');
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

  obtenerAlumnosPorGrupo(grupoId: string) {
    return this.firestore.collection<Alumno>('alumnos', ref => {
      return ref.where('grupoId', '==', grupoId).orderBy('activo', 'desc').orderBy('numeroLista');
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

  obtenerAlumno(alumnoId: string) {
    return this.alumnos.doc<Alumno>(alumnoId).valueChanges().pipe(map(alumno => {
      return { id: alumnoId, ...alumno }
    }));
  }

  agregarAlumno(alumno: Alumno) {
    return this.obtenerAlumnosPorGrupo(alumno.grupoId).pipe(take(1)).toPromise().then(alumnos => {
      alumno.numeroLista = alumnos.length + 1;
      const params = JSON.parse(JSON.stringify(alumno));
      return this.alumnos.add(params);
    });
  }

  actualizarAlumno(alumno: Alumno) {
    let params = {};

    for (const key in alumno) {
      if (key !== 'id') {
        params[key] = alumno[key];
      }
    }
    params = JSON.parse(JSON.stringify(params));
    return this.alumnos.doc<Alumno>(alumno.id).update(params);
  }

  desactivarAlumno(alumnoId: string) {
    return this.alumnos.doc(alumnoId).update({
      activo: false
    });
  }

  activarAlumno(alumnoId: string) {
    return this.alumnos.doc(alumnoId).update({
      activo: true
    });
  }

  eliminarAlumno(alumnoId: string) {
    return this.alumnos.doc(alumnoId).delete();
  }

  asignarNumeroLista(grupos: Grupo[]) {
    grupos.forEach(grupo => {
      this.firestore.collection<Alumno>('alumnos', ref => {
        return ref.where('grupoId', '==', grupo.id).orderBy('apellido').orderBy('nombre');
      }).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const id = a.payload.doc.id;
            const datos = a.payload.doc.data();
            return { id, ...datos };
          });
        })
      ).subscribe(alumnos => {
        for (let i = 0; i < alumnos.length; i++) {
          alumnos[i].numeroLista = i + 1;
          this.actualizarAlumno(alumnos[i]);
        }
      });
    });
  }

  async inicializarAsistenciasClase(claseId: string) {
    let clase: Clase;
    let alumnos: Alumno[];
    let fechas: Fecha[];
    let fechasClase: number[] = [];

    await this.clasesService.obtenerClase(claseId).pipe(take(1)).toPromise().then(cls => {
      clase = cls;
    });
    await this.obtenerAlumnosPorGrupo(clase.grupo.id).pipe(take(1)).toPromise().then(als => {
      alumnos = als;
    });
    await this.fechasService.obtenerFechasHabiles().pipe(take(1)).toPromise().then(fehcasHabiles => {
      fechas = fehcasHabiles;
    });

    clase.dias.forEach(diaClase => {
      diaClase.dias.forEach(diaSemana => {
        fechasClase.push(diaSemana);
      });
    });

    let fechasAsistencias = {};
    fechas.forEach(fecha => {
      if (fechasClase.indexOf(fecha.diaSemana) >= 0) {
        fechasAsistencias[fecha.nombre] = 0;
      }
    });

    const asistencia = new ClaseAlumno(clase.id, fechasAsistencias);
    alumnos.forEach(alumno => {
      alumno.clases.push(asistencia);
      this.actualizarAlumno(alumno);
    });

    return clase;
  }

  async actualizarAsistenciasClase(claseId: string) {
    let clase: Clase;
    let alumnos: Alumno[];
    let fechas: Fecha[];
    let fechasClase: number[] = [];

    await this.clasesService.obtenerClase(claseId).pipe(take(1)).toPromise().then(cls => {
      clase = cls;
    });
    await this.obtenerAlumnosPorGrupo(clase.grupo.id).pipe(take(1)).toPromise().then(als => {
      alumnos = als;
    });
    await this.fechasService.obtenerFechasHabilesDesdeHoy().pipe(take(1)).toPromise().then(fehcasHabiles => {
      fechas = fehcasHabiles;
    });

    clase.dias.forEach(diaClase => {
      diaClase.dias.forEach(diaSemana => {
        fechasClase.push(diaSemana);
      });
    });

    let fechasAsistencias = {};
    fechas.forEach(fecha => {
      if (fechasClase.indexOf(fecha.diaSemana) >= 0) {
        fechasAsistencias[fecha.nombre] = 0;
      }
    });

    const asistencia = new ClaseAlumno(clase.id, fechasAsistencias);
    alumnos.forEach(alumno => {
      alumno.clases.push(asistencia);
      this.actualizarAlumno(alumno);
    });

    return clase;
  }

  async inicializarAsistenciasAlumno(alumno: Alumno) {
    let fechas: Fecha[];
    let clases: Clase[];

    await this.clasesService.obtenerClasesPorGrupo(alumno.grupoId).pipe(take(1)).toPromise().then(cls => {
      clases = cls;
    });
    await this.fechasService.obtenerFechasHabiles().pipe(take(1)).toPromise().then(fehcasHabiles => {
      fechas = fehcasHabiles;
    });

    clases.forEach(clase => {
      let fechasClase: number[] = [];
      let fechasAsistencias = {};

      clase.dias.forEach(diaClase => {
        diaClase.dias.forEach(diaSemana => {
          fechasClase.push(diaSemana);
        });
      });

      fechas.forEach(fecha => {
        if (fechasClase.indexOf(fecha.diaSemana) >= 0) {
          fechasAsistencias[fecha.nombre] = 0;
        }
      });

      const asistencia = new ClaseAlumno(clase.id, fechasAsistencias);
      alumno.clases.push(asistencia);
    });

    return alumno;
  }

  async eliminarAsistenciasClase(clase: Clase) {
    let alumnos: Alumno[];

    await this.obtenerAlumnosPorGrupo(clase.grupo.id).pipe(take(1)).toPromise().then(als => {
      alumnos = als;
    });

    alumnos.forEach(alumno => {
      alumno.clases = alumno.clases.filter(asistencia => {
        if (asistencia.claseId !== clase.id) {
          return asistencia;
        }
      });

      this.actualizarAlumno(alumno);
    });

    return clase;
  }

  cambiarAsistencia(alumno: Alumno) {
  }
}
