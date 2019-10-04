import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Alumno } from 'src/app/models/alumno.model';
import { HoraClase, Clase } from 'src/app/models/clase.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ClasesService } from 'src/app/services/clases.service';
import { RelojService } from 'src/app/services/reloj.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pase-lista',
  templateUrl: './pase-lista.page.html',
  styleUrls: ['./pase-lista.page.scss'],
})
export class PaseListaPage implements OnInit, OnDestroy {

  alumnos: Alumno[];
  alumnosSub: Subscription;
  clase: Clase;
  claseSub: Subscription;
  authSub: Subscription;
  buscando = false;
  asistencias = [];
  hoy: Date = new Date();
  hoyString: string;
  horas: { horaInicio: string, horaFin: string }[];

  constructor(
    private alumnosService: AlumnosService,
    private clasesService: ClasesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.hoy = new Date();

    this.hoy.setHours(15);
    this.hoy.setMinutes(0);
    this.hoy.setMonth(10);
    this.hoy.setDate(29);

    this.hoyString = this.deFechaAString(this.hoy);
    const horaString = this.deHoraAString(this.hoy);
    this.inicializarHoras();

    const periodoIndex = this.horas.findIndex(periodo => {
      return (horaString >= periodo.horaInicio && horaString <= periodo.horaFin);
    });

    this.buscando = true;
    this.authSub = this.authService.usuarioActual().subscribe(usuario => {
      if (usuario) {
        this.claseSub = this.clasesService.obtenerClasesPorHora(this.hoy.getDay(), periodoIndex + 1, usuario.id)
          .subscribe(clase => {
            this.clase = clase;
            if (clase) {
              this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
                this.alumnos = alumnos;
                this.inicializarAsitencias();
                this.buscando = false;
              });
            } else {
              this.buscando = false;
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
        .map(clase => clase.fechas[this.hoyString])[0];
    });
  }

  darAsistencia(alumnoId: string, estado: number, index: number) {
    this.asistencias[index] = estado;
    const asistenciasAlumno = this.alumnos[index].clases;
    asistenciasAlumno[
      asistenciasAlumno.findIndex(clase => clase.claseId === this.clase.id)
    ].fechas[this.hoyString] = estado;

    this.alumnosService.actualizarAlumno(this.alumnos[index]);
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
