import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SeederService } from './services/seeder.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private seederService: SeederService,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.seederService.main();
    });
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
