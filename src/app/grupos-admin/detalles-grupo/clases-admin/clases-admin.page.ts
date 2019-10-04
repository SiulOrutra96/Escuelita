import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Clase } from 'src/app/models/clase.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ClasesService } from 'src/app/services/clases.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevaClaseComponent } from './nueva-clase/nueva-clase.component';


@Component({
  selector: 'app-clases-admin',
  templateUrl: './clases-admin.page.html',
  styleUrls: ['./clases-admin.page.scss'],
})
export class ClasesAdminPage implements OnInit, OnDestroy {

  grupoId: string;
  clases: Clase[] = [];
  clasesSub: Subscription;
  usuario: Usuario;
  authSub: Subscription;
  buscando = false;

  constructor(
    private clasesService: ClasesService,
    private alumnosService: AlumnosService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.buscando = true;
    this.route.paramMap.subscribe(parametros => {
      if (parametros.has('grupoId')) {
        this.grupoId = parametros.get('grupoId');
        this.authSub = this.authService.usuarioActual().subscribe(usuario => {
          this.usuario = usuario;
          this.clasesSub = this.clasesService.obtenerClasesPorGrupo(this.grupoId).subscribe(clases => {
            this.clases = clases;
            this.buscando = false;
          });
        })
      } else {
        this.router.navigateByUrl('/grupos');
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

  abrirModalClase(clase?: Clase) {
    this.modalCtrl
      .create({ component: NuevaClaseComponent, componentProps: { clase, grupoId: this.grupoId } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'agregar') {
          this.loadingCtrl.create({ message: 'Agregando clase...' }).then(cargador => {
            cargador.present();
            this.clasesService.agregarClase(res.data.clase).then(claseNueva => {
              this.alumnosService.inicializarAsistenciasClase(claseNueva.id).then(() => {
                cargador.dismiss();
              });
            });
          });
        }
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
