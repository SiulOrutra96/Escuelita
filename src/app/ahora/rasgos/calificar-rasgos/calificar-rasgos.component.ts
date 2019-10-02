import { Component, OnInit, Input } from '@angular/core';

import { Alumno } from 'src/app/models/alumno.model';
import { Rasgo } from 'src/app/models/clase.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calificar-rasgos',
  templateUrl: './calificar-rasgos.component.html',
  styleUrls: ['./calificar-rasgos.component.scss'],
})
export class CalificarRasgosComponent implements OnInit {

  @Input() calificaciones: { alumnoNombre: string, alumnoApellido: string, calificacion: number }[];
  @Input() rasgos: Rasgo[];
  @Input() index: number;
  calificacionesResp;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.calificacionesResp = JSON.parse(JSON.stringify(this.calificaciones));
  }

  validarCalificaciones() {
    let valido = true;
    for (const alumno of this.calificaciones) {
      if ((alumno.calificacion !== 0 && !alumno.calificacion)  || alumno.calificacion < 0 || alumno.calificacion > 10) {
        valido = false;
        break;
      }
    }

    return valido;
  }

  calificar(accion: string) {
    let editar = false;
    if (this.validarCalificaciones()) {
      for (let i = 0; i < this.calificaciones.length; i++) {
        if (this.calificacionesResp[i].calificacion !== this.calificaciones[i].calificacion) {
          editar = true;
          break;
        }
      }
    }

    this.modalCtrl.dismiss({
      calificaciones: this.calificaciones.map(alumno => +alumno.calificacion),
      editar
    }, accion);
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
