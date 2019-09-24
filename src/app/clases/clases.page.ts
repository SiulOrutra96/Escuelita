import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Clase } from '../models/clase.model';
import { ClasesService } from 'src/app/services/clases.service';
import { NuevaClaseComponent } from './nueva-clase/nueva-clase.component';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit, OnDestroy {

  clases: Clase[] = [];
  clasesSub: Subscription;
  buscando = false;

  constructor(
    private clasesService: ClasesService,
    private alumnosService: AlumnosService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.clasesSub = this.clasesService.obtenerClases().subscribe(clases => {
      this.clases = clases;
    });
  }

  ngOnDestroy() {
    if (this.clasesSub) {
      this.clasesSub.unsubscribe();
    }
  }

  abrirModalAgregarClase() {
    this.modalCtrl
      .create({ component: NuevaClaseComponent })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'agregar') {
          this.clasesService.agregarClase(res.data.clase).then(clase => {
            this.alumnosService.inicializarAsistenciasClase(clase.id);
          });
        }
      });
  }

  abrirModalEditarClase(claseId: string) {
    this.modalCtrl
      .create({ component: NuevaClaseComponent, componentProps: { claseId } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'editar') {
          this.clasesService.actualizarClase(res.data.clase).then(() => {
            this.alumnosService.actualizarAsistenciasClase(res.data.clase.id);
          });
        }
      });
  }

  eliminarClase(clase: Clase) {
    this.alertCtrl.create({
      header: 'Eliminar clase',
      message: '¿Seguro que quieres ELIMINAR esta clase? Todos los registros se perderán.',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Eliminar',
        handler: () => {
          this.alumnosService.eliminarAsistenciasClase(clase).then(() => {
            this.clasesService.eliminarClase(clase);
          });
        }
      }]
    }).then(alerta => {
      alerta.present();
    });
  }
}
