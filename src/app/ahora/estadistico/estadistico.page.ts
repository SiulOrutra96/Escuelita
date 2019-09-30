import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumno, EstadoAsistencia } from 'src/app/models/alumno.model';
import { ClasesService } from 'src/app/services/clases.service';
import { Clase, HoraClase } from 'src/app/models/clase.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-estadistico',
  templateUrl: './estadistico.page.html',
  styleUrls: ['./estadistico.page.scss'],
})
export class EstadisticoPage implements OnInit, OnDestroy {

  alumnos: Alumno[];
  alumnosSub: Subscription;
  claseId: string;
  clase: Clase;
  claseSub: Subscription;
  authSub: Subscription;
  buscando = false;
  asistencias = [];
  asistenciasFiltradas = [];
  EstadoAsistencia = EstadoAsistencia;
  hoy: Date = new Date();
  hoyString: string;
  horas: { horaInicio: string, horaFin: string }[];
  segmentoActivo = 't1';

  trimestres = [
    {
      inicio: '2019-09-01',
      fin: '2019-09-30',
      nombre: 'Periodo 1',
      sesiones: 0,
      asistencias: [],
      faltas: [],
      justificaciones: [],
      porcentaje: []
    },
    {
      inicio: '2019-10-01',
      fin: '2019-10-31',
      nombre: 'Periodo 2',
      sesiones: 0,
      asistencias: [],
      faltas: [],
      justificaciones: [],
      porcentaje: []
    },
    {
      inicio: '2019-11-01',
      fin: '2019-11-30',
      nombre: 'Periodo 3',
      sesiones: 0,
      asistencias: [],
      faltas: [],
      justificaciones: [],
      porcentaje: []
    }
  ];

  constructor(
    private alumnosService: AlumnosService,
    private clasesService: ClasesService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.hoy = new Date();

    this.hoy.setHours(8);
    this.hoy.setMinutes(10);
    this.hoy.setMonth(10);
    this.hoy.setDate(29);

    this.hoyString = this.deFechaAString(this.hoy);
    const horaString = this.deHoraAString(this.hoy);
    this.inicializarHoras();

    const periodoIndex = this.horas.findIndex(periodo => {
      return (horaString >= periodo.horaInicio && horaString <= periodo.horaFin);
    });

    this.buscando = true;
    this.route.paramMap.subscribe(parametros => {
      if (parametros.has('claseId')) {
        this.claseId = parametros.get('claseId');
        this.claseSub = this.clasesService.obtenerClase(this.claseId).subscribe(clase => {
          this.clase = clase;
          this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
            this.alumnos = alumnos;
            this.inicializarAsitencias();
            this.filtrarAsistencias();
            this.buscando = false;
          });
        });
      } else {
        this.authSub = this.authService.usuarioActual().subscribe(usuario => {
          if (usuario) {
            this.claseSub = this.clasesService.obtenerClasesPorHora(this.hoy.getDay(), periodoIndex + 1, usuario.id)
              .subscribe(clase => {
                this.clase = clase;
                if (clase) {
                  this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
                    this.alumnos = alumnos;
                    this.inicializarAsitencias();
                    this.filtrarAsistencias();
                    this.buscando = false;
                  });
                }
              });
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.alumnosSub) {
      this.alumnosSub.unsubscribe();
    }

    if (this.claseSub) {
      this.claseSub.unsubscribe();
    }

    if (this.authSub) {
      this.authSub.unsubscribe();
    }
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
    this.trimestres.forEach(trimestre => {
      const sessionesTemp = this.asistencias.map(asistencias => {
        return asistencias.filter(asistencia => {
          if (asistencia.fecha >= trimestre.inicio && asistencia.fecha <= trimestre.fin) {
            return asistencia;
          }
        });
      });

      trimestre.sesiones = sessionesTemp[0].length;
      trimestre.asistencias = sessionesTemp.map(sesiones => {
        return sesiones.filter(sesion => {
          if (sesion.estado === 0) {
            return sesion;
          }
        }).length;
      });
      trimestre.faltas = sessionesTemp.map(sesiones => {
        return sesiones.filter(sesion => {
          if (sesion.estado === 1) {
            return sesion;
          }
        }).length;
      });
      trimestre.justificaciones = sessionesTemp.map(sesiones => {
        return sesiones.filter(sesion => {
          if (sesion.estado === 2) {
            return sesion;
          }
        }).length;
      });

      trimestre.porcentaje = sessionesTemp.map((s, index) => {
        return (trimestre.asistencias[index] * 100) / trimestre.sesiones;
      });
    });
  }

  // segmentoCambiado(evento: CustomEvent<SegmentChangeEventDetail>) {
  //   this.segmentoActivo = evento.detail.value;
  //   this.filtrarAsistencias();
  // }

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
