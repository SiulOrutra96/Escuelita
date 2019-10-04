import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';

import { Alumno } from 'src/app/models/alumno.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { NuevoAlumnoComponent } from './nuevo-alumno/nuevo-alumno.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/models/clase.model';
import { Subscription } from 'rxjs';
import { Grupo } from 'src/app/models/grupo.model';
import { GruposService } from 'src/app/services/grupos.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-alumnos-admin',
  templateUrl: './alumnos-admin.page.html',
  styleUrls: ['./alumnos-admin.page.scss'],
})
export class AlumnosAdminPage implements OnInit, OnDestroy {

  alumnos: Alumno[] = [];
  alumnosSub: Subscription;
  clase: Clase;
  claseSub: Subscription;
  grupo: Grupo;
  grupoSub: Subscription;
  usuario: Usuario;
  usuarioSub: Subscription;
  buscando = false;

  constructor(
    private modalCtrl: ModalController,
    private alumnosService: AlumnosService,
    private gruposService: GruposService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuarioSub = this.authService.usuarioActual().subscribe(usuario => {
      this.usuario = usuario;
    });
    this.buscando = true;
    this.route.paramMap.subscribe(parametros => {
      if (parametros.has('grupoId')) {
        this.gruposService.obtenerGrupo(parametros.get('grupoId')).subscribe(grupo => {
          this.grupo = grupo;
          this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.grupo.id).subscribe(alumnos => {
            this.alumnos = alumnos;
            this.buscando = false;
          });
        });
      } else {
        this.router.navigateByUrl('/grupos');
      }
    });
  }

  ngOnDestroy() {
    if (this.alumnosSub) {
      this.alumnosSub.unsubscribe();
    }

    if (this.claseSub) {
      this.claseSub.unsubscribe();
    }

    if (this.usuarioSub) {
      this.usuarioSub.unsubscribe();
    }
  }

  abrirModalAlumno(alumno?: Alumno) {
    this.modalCtrl
      .create({ component: NuevoAlumnoComponent, componentProps: { alumno, grupoId: this.grupo.id } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'agregar') {
          this.loadingCtrl.create({ message: 'Agregando alumno...' }).then(cargador => {
            cargador.present();
            this.alumnosService.inicializarAsistenciasAlumno(res.data.alumno).then(alumno => {
              this.alumnosService.agregarAlumno(alumno).then(() => {
                cargador.dismiss();
              });
            });
          });
        }
        if (res.role === 'editar') {
          this.loadingCtrl.create({ message: 'Actualizando alumno...' }).then(cargador => {
            cargador.present();
            this.alumnosService.actualizarAlumno(res.data.alumno).then(() => {
              cargador.dismiss();
            });
          });
        }
      });
  }

  desactivarAlumno(alumnoId: string) {
    this.alertCtrl.create({
      header: 'Desactivar alumno',
      message: '¿Seguro que quieres Desactivar a este alumno?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Desactivar',
        handler: () => {
          this.loadingCtrl.create({ message: 'Desactivando alumno...' }).then(cargador => {
            cargador.present();
            this.alumnosService.desactivarAlumno(alumnoId).then(() => {
              cargador.dismiss();
            });
          });
        }
      }]
    }).then(alerta => {
      alerta.present();
    });
  }

  activarAlumno(alumnoId: string) {
    this.alertCtrl.create({
      header: 'Reactivar alumno',
      message: '¿Seguro que quieres Reactivar a este alumno?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Reactivar',
        handler: () => {
          this.loadingCtrl.create({ message: 'Activando alumno...' }).then(cargador => {
            cargador.present();
            this.alumnosService.activarAlumno(alumnoId).then(() => {
              cargador.dismiss();
            });
          });
        }
      }]
    }).then(alerta => {
      alerta.present();
    });
  }

  eliminarAlumno(alumnoId: string) {
    this.alertCtrl.create({
      header: 'Eliminar alumno',
      message: '¿Seguro que quieres ELIMINAR a este alumno? Todos los registros se perderán.',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Eliminar',
        handler: () => {
          this.loadingCtrl.create({ message: 'Eliminando alumno...' }).then(cargador => {
            cargador.present();
            this.alumnosService.eliminarAlumno(alumnoId).then(() => {
              cargador.dismiss();
            });
          });
        }
      }]
    }).then(alerta => {
      alerta.present();
    });
  }
}
