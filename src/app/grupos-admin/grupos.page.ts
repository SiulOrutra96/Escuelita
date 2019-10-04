import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GruposService } from '../services/grupos.service';
import { Grupo } from '../models/grupo.model';
import { Usuario } from '../models/usuario.model';
import { NuevoGrupoComponent } from './nuevo-grupo/nuevo-grupo.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit, OnDestroy {

  grupos: Grupo[] = [];
  gruposSub: Subscription;
  usuario: Usuario;
  usuarioSub: Subscription;
  buscando = false;

  constructor(
    private gruposService: GruposService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.usuarioSub = this.authService.usuarioActual().subscribe(usuario => {
      this.usuario = usuario;
    });
    this.buscando = true;
    this.gruposSub = this.gruposService.obtenerGrupos().subscribe(grupos => {
      this.grupos = grupos;
      this.buscando = false;
    });
  }

  ngOnDestroy() {
    if (this.gruposSub) {
      this.gruposSub.unsubscribe();
    }

    if (this.usuarioSub) {
      this.usuarioSub.unsubscribe();
    }
  }

  abrirModalGrupo(grupo?: Grupo) {
    this.modalCtrl
      .create({ component: NuevoGrupoComponent, componentProps: { grupo } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'agregar') {
          this.loadingCtrl.create({ message: 'Agregando grupo...' }).then(cargador => {
            cargador.present();
          });
        }
        if (res.role === 'editar') {
          this.loadingCtrl.create({ message: 'Actualizando grupo...' }).then(cargador => {
            cargador.present();
          });
        }
      });
  }

  eliminarGrupo(grupoId: string) {

  }
}
