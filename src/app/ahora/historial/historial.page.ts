import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alumno, EstadoAsistencia } from 'src/app/models/alumno.model';
import { Subscription } from 'rxjs';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit, OnDestroy {

  alumnos: Alumno[];
  alumnosSub: Subscription;
  buscando = false;
  EstadoAsistencia = EstadoAsistencia;

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit() {
    // this.alumnosSub = this.alumnosService.alumnos.subscribe(alumnos => {
    //   this.alumnos = alumnos;
    //   this.buscando = false;
    // });
    // this.buscando = true;
    // this.alumnosService.obtenerAlumnos();
  }

  ngOnDestroy(): void {
    this.alumnosSub.unsubscribe();
  }

}
