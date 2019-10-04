import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumno } from 'src/app/models/alumno.model';
import { ClasesService } from 'src/app/services/clases.service';
import { Clase, HoraClase } from 'src/app/models/clase.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FechasService } from 'src/app/services/fechas.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-estadistico',
  templateUrl: './estadistico.page.html',
  styleUrls: ['./estadistico.page.scss'],
})
export class EstadisticoPage implements OnInit, OnDestroy {

  usuario: Usuario;
  alumnos: Alumno[];
  alumnosSub: Subscription;
  claseId: string;
  clase: Clase;
  claseSub: Subscription;
  authSub: Subscription;
  buscando = false;
  asistencias = [];
  asistenciasFiltradas = [];
  hoy: Date = new Date();
  hoyString: string;
  horas: { horaInicio: string, horaFin: string }[];
  calificaciones = [];

  trimestres = [
    {
      inicio: '2019-08-01',
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
    private authService: AuthService,
    private fechasService: FechasService
  ) { }

  ngOnInit() {
    this.hoy = new Date();

    this.hoy.setHours(15);
    this.hoy.setMinutes(0);
    this.hoy.setMonth(10);
    this.hoy.setDate(29);

    this.hoyString = this.fechasService.deFechaAString(this.hoy);
    const horaString = this.fechasService.deHoraAString(this.hoy);
    this.inicializarHoras();

    const periodoIndex = this.horas.findIndex(periodo => {
      return (horaString >= periodo.horaInicio && horaString <= periodo.horaFin);
    });

    this.buscando = true;
    this.route.paramMap.subscribe(parametros => {
      if (parametros.has('claseId')) {
        this.authSub = this.authService.usuarioActual().subscribe(usuario => {
          this.usuario = usuario;
          this.claseId = parametros.get('claseId');
          this.claseSub = this.clasesService.obtenerClase(this.claseId).subscribe(clase => {
            this.clase = clase;
            this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
              this.alumnos = alumnos;
              this.inicializarAsitencias();
              this.filtrarAsistencias();
              this.inicializarCalificaciones();
              console.log('calfs: ', this.calificaciones);
              this.buscando = false;
            });
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
                    this.inicializarCalificaciones();
                    console.log('calfs: ', this.calificaciones);
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
      return alumno.clases
        .filter(clase => clase.claseId === this.clase.id)
        .map(clase => {
          let fechas = [];

          for (const key in clase.fechas) {
            if (clase.fechas.hasOwnProperty(key) && key <= this.hoyString) {
              fechas.push({ fecha: key, estado: clase.fechas[key] });

              if (key === this.hoyString) {
                break;
              }
            }
          }

          return fechas;
        })[0];
    });
  }

  inicializarCalificaciones() {
    this.calificaciones = this.alumnos.map(alumno => {
      return alumno.clases
        .filter(clase => clase.claseId === this.clase.id)
        .map(clase => {
          let rasgos = [];

          for (const key in clase.rasgos) {
            if (clase.rasgos.hasOwnProperty(key)) {
              rasgos.push(clase.rasgos[key]);
            }
          }

          return { rasgos, calificacionFinal: clase.calificacion };
        })[0];
    });
  }

  inicializarHoras() {
    this.horas = (Object.keys(HoraClase)
      .map(key => HoraClase[key])
      .filter(value => typeof value === 'string') as string[]
    ).map(item => {
      const horaInicio = this.fechasService.deStringAHora(item);
      // se añaden 50 minutos
      const horaFin = new Date(horaInicio.getTime() + 50 * 60 * 1000);
      return { horaInicio: this.fechasService.deHoraAString(horaInicio), horaFin: this.fechasService.deHoraAString(horaFin) };
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

  calcularPorcentaje(index: number) {
    let asistenciasAlumno = 0;
    this.trimestres.forEach(trimestre => {
      asistenciasAlumno += trimestre.asistencias[index];
    });

    asistenciasAlumno = (asistenciasAlumno * 100) / this.asistencias[index].length;
    return asistenciasAlumno;
  }
}
