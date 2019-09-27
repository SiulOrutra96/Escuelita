import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {

  authSub: Subscription;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSub = this.authService.usuarioAutenticado().subscribe(res => {
      console.log('res: ', res);
      if (res === true) {
        this.router.navigateByUrl('/ahora/tabs/pase-lista');
      }
      if (this.authSub) {
        this.authSub.unsubscribe();
      }
    });
    // console.log('usuarioId: ', this.authService.usuarioId());
    // console.log('usuario Autenticado: ', this.authService.usuarioAutenticado());
    // if (this.authService.usuarioAutenticado()) {
    //   this.router.navigateByUrl('/ahora/tabs/pase-lista');
    // }
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
          loadingEl.dismiss();
          this.router.navigateByUrl('/ahora/tabs/pase-lista');
        }).catch(err => {
          loadingEl.dismiss();
          console.log(err);
        });
      });
  }
}
