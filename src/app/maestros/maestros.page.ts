import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';
import { NuevoMaestroComponent } from './nuevo-maestro/nuevo-maestro.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.page.html',
  styleUrls: ['./maestros.page.scss'],
})
export class MaestrosPage implements OnInit, OnDestroy {

  maestros: Usuario[];
  usuariosSub: Subscription;
  usuario: Usuario;
  usuarioSub: Subscription;
  buscando = false;

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.usuarioSub = this.authService.usuarioActual().subscribe(usuario => {
      this.usuario = usuario;
    });

    this.buscando = true;
    this.usuariosSub = this.usuariosService.obtenerMaestros().subscribe(maestros => {
      console.log('maestros: ', maestros);
      this.maestros = maestros;
      this.buscando = false;
    });
  }

  ngOnDestroy() {
    if (this.usuariosSub) {
      this.usuariosSub.unsubscribe();
    }

    if (this.usuarioSub) {
      this.usuarioSub.unsubscribe();
    }
  }

  abrirModalMaestro(maestro?: Usuario) {
    this.modalCtrl
      .create({ component: NuevoMaestroComponent, componentProps: { maestro } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'agregar') {
          this.loadingCtrl.create({ message: 'Agregando maestro...' }).then(cargador => {
            cargador.present();
          });
        }
        if (res.role === 'editar') {
          this.loadingCtrl.create({ message: 'Actualizando maestro...' }).then(cargador => {
            cargador.present();
          });
        }
      });
  }

  eliminarMaestro(maestroId: string) {

  }
}
