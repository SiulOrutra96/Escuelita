import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Alumno, EstadoAsistencia } from 'src/app/models/alumno.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ClasesService } from 'src/app/services/clases.service';
import { HoraClase, Clase } from 'src/app/models/clase.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit, OnDestroy {

  alumnos: Alumno[];
  alumnosSub: Subscription;
  clase: Clase;
  claseSub: Subscription;
  buscando = false;
  asistencias = [];
  asistenciasFiltradas = [];
  EstadoAsistencia = EstadoAsistencia;
  hoy: Date = new Date();
  hoyString: string;
  horas: { horaInicio: string, horaFin: string }[];
  segmentoActivo = 't1';

  primerTrimestre = { inicio: '2019-09-01', fin: '2019-09-30' };
  segundoTrimestre = { inicio: '2019-10-01', fin: '2019-10-31' };
  tercerTrimestre = { inicio: '2019-11-01', fin: '2019-11-30' };

  constructor(
    private alumnosService: AlumnosService,
    private clasesService: ClasesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.hoy = new Date();

    this.hoy.setHours(8);
    this.hoy.setMinutes(10);
    this.hoy.setDate(27);

    this.hoyString = this.deFechaAString(this.hoy);
    const horaString = this.deHoraAString(this.hoy);
    this.inicializarHoras();

    const periodoIndex = this.horas.findIndex(periodo => {
      return (horaString >= periodo.horaInicio && horaString <= periodo.horaFin);
    });

    this.claseSub = this.clasesService.obtenerClasesPorHora(this.hoy.getDay(), periodoIndex + 1).subscribe(clase => {
      this.clase = clase;
      if (clase) {
        this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
          this.alumnos = alumnos;
          this.inicializarAsitencias();
          this.filtrarAsistencias();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.alumnosSub.unsubscribe();
  }

  inicializarAsitencias() {
    this.asistencias = this.alumnos.map(alumno => {
      return alumno.asistencias
        .filter(asistencia => asistencia.claseId === this.clase.id)
        .map(asistencia => {
          let fechas = [];

          for (const key in asistencia.fechas) {
            if (asistencia.fechas.hasOwnProperty(key) && key <= this.hoyString) {
              fechas.push({ fecha: key, estado: asistencia.fechas[key] });

              if (key === this.hoyString) {
                break;
              }
            }
          }

          return fechas;
        })[0];
    });
  }

  inicializarHoras() {
    this.horas = (Object.keys(HoraClase)
      .map(key => HoraClase[key])
      .filter(value => typeof value === 'string') as string[]
    ).map(item => {
      const horaInicio = this.deStringAHora(item);
      // se añaden 50 minutos
      const horaFin = new Date(horaInicio.getTime() + 50 * 60 * 1000);
      return { horaInicio: this.deHoraAString(horaInicio), horaFin: this.deHoraAString(horaFin) };
    });
  }

  filtrarAsistencias() {
    if (this.segmentoActivo === 't1') {
      this.asistenciasFiltradas = this.asistencias.map(asistencias => {
        return asistencias.filter(asistencia => {
          if (asistencia.fecha >= this.primerTrimestre.inicio && asistencia.fecha <= this.primerTrimestre.fin) {
            return asistencia;
          }
        });
      });
    } else if (this.segmentoActivo === 't2') {
      this.asistenciasFiltradas = this.asistencias.map(asistencias => {
        return asistencias.filter(asistencia => {
          if (asistencia.fecha >= this.segundoTrimestre.inicio && asistencia.fecha <= this.segundoTrimestre.fin) {
            return asistencia;
          }
        });
      });
    } else if (this.segmentoActivo === 't3') {
      this.asistenciasFiltradas = this.asistencias.map(asistencias => {
        return asistencias.filter(asistencia => {
          if (asistencia.fecha >= this.tercerTrimestre.inicio && asistencia.fecha <= this.tercerTrimestre.fin) {
            return asistencia;
          }
        });
      });
    } else if (this.segmentoActivo === 'general') {
      this.asistenciasFiltradas = this.asistencias;
    }
  }

  segmentoCambiado(evento: CustomEvent<SegmentChangeEventDetail>) {
    this.segmentoActivo = evento.detail.value;
    this.filtrarAsistencias();
  }

  deFechaAString(fecha: Date) {
    let fechaString = fecha.getFullYear() + '-';
    fechaString += (fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : + (fecha.getMonth() + 1);
    fechaString += fecha.getDate() < 10 ? '-0' + fecha.getDate() : '-' + fecha.getDate();

    return fechaString;
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
}
