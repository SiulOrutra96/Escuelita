import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {

  authSub: Subscription;
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private usuariosServices: UsuariosService
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

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const email = loginForm.value.email;
    const conrasenia = loginForm.value.contrasenia;

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Iniciando sesión...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.iniciarSesion(email, conrasenia).then(res => {
          this.usuariosServices.obtenerUsuario(res.user.uid).pipe(
            take(1),
            tap(usuario => {
              switch (usuario.rol) {
                case 0:
                  loadingEl.dismiss();
                  this.router.navigateByUrl('/inicio');
                  break;
                case 1:
                  loadingEl.dismiss();
                  this.router.navigateByUrl('/ahora/tabs/pase-lista');
                  break;
                case 2:
                  loadingEl.dismiss();
                  this.router.navigateByUrl('/ahora/tabs/pase-lista');
                  break;
                default:
                  loadingEl.dismiss();
                  this.router.navigateByUrl('/inicio');
              }
            })
          ).subscribe();
        }).catch(err => {
          loadingEl.dismiss();
          console.log(err);
        });
      });
  }
}
