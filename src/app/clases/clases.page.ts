import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Clase } from '../models/clase.model';
import { ClasesService } from 'src/app/services/clases.service';
import { NuevaClaseComponent } from './nueva-clase/nueva-clase.component';
import { AlumnosService } from '../services/alumnos.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit, OnDestroy {

  clases: Clase[] = [];
  clasesSub: Subscription;
  authSub: Subscription;
  buscando = false;

  constructor(
    private clasesService: ClasesService,
    private alumnosService: AlumnosService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.buscando = true;
    this.authSub = this.authService.usuarioActual().subscribe(usuario => {
      if (usuario) {
        this.clasesSub = this.clasesService.obtenerClasesPorMaestro(usuario.id).subscribe(clases => {
          this.clases = clases;
          this.buscando = false;
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.clasesSub) {
      this.clasesSub.unsubscribe();
    }

    if (this.authSub) {
      this.authSub.unsubscribe();
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
          this.loadingCtrl.create({ message: 'Agregando clase...' }).then(cargador => {
            cargador.present();
            this.clasesService.agregarClase(res.data.clase).then(clase => {
              this.alumnosService.inicializarAsistenciasClase(clase.id).then(() => {
                cargador.dismiss();
              });
            });
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
          this.loadingCtrl.create({ message: 'Actualizando clase...' }).then(cargador => {
            cargador.present();
            this.clasesService.actualizarClase(res.data.clase).then(() => {
              this.alumnosService.actualizarAsistenciasClase(res.data.clase.id).then(() => {
                cargador.dismiss();
              });
            });
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
          this.loadingCtrl.create({ message: 'Eliminando clase...' }).then(cargador => {
            cargador.present();
            this.alumnosService.eliminarAsistenciasClase(clase).then(() => {
              this.clasesService.eliminarClase(clase).then(() => {
                cargador.dismiss();
              });
            });
          });
        }
      }]
    }).then(alerta => {
      alerta.present();
    });
  }
}
