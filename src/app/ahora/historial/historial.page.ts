import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';

import { Alumno, EstadoAsistencia } from 'src/app/models/alumno.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ClasesService } from 'src/app/services/clases.service';
import { Clase, HoraClase } from 'src/app/models/clase.model';
import { AuthService } from 'src/app/auth/auth.service';
import { FechasService } from 'src/app/services/fechas.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit, OnDestroy {

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
  EstadoAsistencia = EstadoAsistencia;
  hoy: Date = new Date();
  hoyString: string;
  horas: { horaInicio: string, horaFin: string }[];
  segmentoActivo = 't1';

  primerTrimestre = { inicio: '2019-08-01', fin: '2019-09-30' };
  segundoTrimestre = { inicio: '2019-10-01', fin: '2019-10-31' };
  tercerTrimestre = { inicio: '2019-11-01', fin: '2019-11-30' };

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
}
