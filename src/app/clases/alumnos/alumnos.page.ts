import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { Alumno } from 'src/app/models/alumno.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { NuevoAlumnoComponent } from './nuevo-alumno/nuevo-alumno.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasesService } from 'src/app/services/clases.service';
import { Clase } from 'src/app/models/clase.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit, OnDestroy {

  alumnos: Alumno[] = [];
  alumnosSub: Subscription;
  claseSub: Subscription;
  clase: Clase = new Clase();
  buscando = false;

  constructor(
    private modalCtrl: ModalController,
    private alumnosService: AlumnosService,
    private clasesService: ClasesService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(parametros => {
      if (!parametros.has('claseId')) {
        this.router.navigateByUrl('clases/');
      }

      this.claseSub = this.clasesService.obtenerClase(parametros.get('claseId')).subscribe(clase => {
        this.clase = clase;
        this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
          this.alumnos = alumnos;
          console.log('alumnos: ', alumnos);
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.alumnosSub) {
      this.alumnosSub.unsubscribe();
    }

    if (this.claseSub) {
      this.claseSub.unsubscribe();
    }
  }

  abrirModalAgregarAlumno() {
    this.modalCtrl
      .create({ component: NuevoAlumnoComponent, componentProps: { grupoId: this.clase.grupo.id } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'agregar') {
          this.alumnosService.inicializarAsistenciasAlumno(res.data.alumno).then(alumno => {
            this.alumnosService.agregarAlumno(alumno);
          });
        }
      });
  }

  abrirModalEditarAlumno(alumnoId: string) {
    this.modalCtrl
      .create({ component: NuevoAlumnoComponent, componentProps: { alumnoId } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'editar') {
          this.alumnosService.actualizarAlumno(res.data.alumno);
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
          this.alumnosService.desactivarAlumno(alumnoId);
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
          this.alumnosService.activarAlumno(alumnoId);
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
          this.alumnosService.eliminarAlumno(alumnoId);
        }
      }]
    }).then(alerta => {
      alerta.present();
    });
  }
}
