import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alumno, Asistencia } from 'src/app/models/alumno.model';
import { Subscription } from 'rxjs';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-pase-lista',
  templateUrl: './pase-lista.page.html',
  styleUrls: ['./pase-lista.page.scss'],
})
export class PaseListaPage implements OnInit, OnDestroy {

  alumnos: Alumno[];
  alumnosSub: Subscription;
  buscando = false;
  asistencias: Asistencia[];
  hoy: string;

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit() {
    const fecha = new Date();
    this.hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
    this.alumnosSub = this.alumnosService.obtenerAlumnos().subscribe(alumnos => {
      this.alumnos = alumnos;
      // this.inicializarAsitencias();
    });
  }

  ngOnDestroy(): void {
    this.alumnosSub.unsubscribe();
  }

  inicializarAsitencias() {
    // this.asistencias = [];
    // this.alumnos.forEach(alumno => {
    //   let asistencia = alumno.asistencias.find(asis => asis.fecha === this.hoy);

    //   if (asistencia) {
    //     this.asistencias.push(asistencia);
    //   } else {
    //     asistencia = new Asistencia(this.hoy);
    //     this.asistencias.push(asistencia);
    //     alumno.asistencias.push(asistencia);
    //   }
    // });
  }

  darAsistencia(alumnoId: string, estado: number, index: number) {
    // this.asistencias[index].estado = estado;
    // this.alumnosService.darAsistencia(alumnoId, this.asistencias[index]);
  }
}
