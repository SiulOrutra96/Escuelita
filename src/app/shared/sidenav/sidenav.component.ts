import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  authSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.authSub = this.authService.usuarioActual().subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  cerrarSesion() {
    this.loadingCtrl.create({ message: 'Cerrando sesión...' })
      .then(cargador => {
        cargador.present();
        this.authService.cerrarSesion().then(() => {
          cargador.dismiss();
          this.router.navigateByUrl('/auth');
        });
      });
  }
}
