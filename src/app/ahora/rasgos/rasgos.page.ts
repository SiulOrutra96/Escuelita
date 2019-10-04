import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { FechasService } from 'src/app/services/fechas.service';
import { ClasesService } from 'src/app/services/clases.service';
import { Clase, HoraClase } from 'src/app/models/clase.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumno } from 'src/app/models/alumno.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-rasgos',
  templateUrl: './rasgos.page.html',
  styleUrls: ['./rasgos.page.scss'],
})
export class RasgosPage implements OnInit, OnDestroy {

  claseId: string;
  claseSub: Subscription;
  clase: Clase;
  alumnosSub: Subscription;
  alumnos: Alumno[];
  authSub: Subscription;
  rasgos = [];
  buscando = false;
  segmentoActivo = 'rasgos';
  hoy: Date = new Date();
  hoyString: string;
  horas: { horaInicio: string, horaFin: string }[];

  primerTrimestre = { inicio: '2019-09-01', fin: '2019-09-30' };
  segundoTrimestre = { inicio: '2019-10-01', fin: '2019-10-31' };
  tercerTrimestre = { inicio: '2019-11-01', fin: '2019-11-30' };

  constructor(
    private fechasService: FechasService,
    private route: ActivatedRoute,
    private clasesService: ClasesService,
    private alumnosService: AlumnosService,
    private authService: AuthService
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
        this.claseId = parametros.get('claseId');
        this.claseSub = this.clasesService.obtenerClase(this.claseId).subscribe(clase => {
          this.clase = clase;
          this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
            this.alumnos = alumnos;
            this.inicializarRasgos();
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
                    this.inicializarRasgos();
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

  segmentoCambiado(evento: CustomEvent<SegmentChangeEventDetail>) {
    this.segmentoActivo = evento.detail.value;
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

  inicializarRasgos() {
    this.rasgos = this.alumnos.map(alumno => {
      return alumno.clases
        .filter(clase => clase.claseId === this.clase.id)
        .map(clase => clase.rasgos)[0];
    });
  }
}
