import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

import { Rasgo, Clase } from 'src/app/models/clase.model';
import { NuevoRasgoComponent } from '../nuevo-rasgo/nuevo-rasgo.component';
import { Alumno, CalificacionesRasgos } from 'src/app/models/alumno.model';
import { ClasesService } from 'src/app/services/clases.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CalificarRasgosComponent } from '../calificar-rasgos/calificar-rasgos.component';

@Component({
  selector: 'app-lista-rasgos',
  templateUrl: './lista-rasgos.component.html',
  styleUrls: ['./lista-rasgos.component.scss'],
})
export class ListaRasgosComponent implements OnInit {

  @Input() alumnos: Alumno[];
  @Input() clase: Clase;
  mostrarPeriodo1 = true;
  mostrarPeriodo2 = true;
  mostrarPeriodo3 = true;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private clasesService: ClasesService,
    private alumnosService: AlumnosService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

  abrirRasgoModal(trimestre: string, rasgoEditar?: Rasgo) {
    let maximo = 100;

    this.clase.rasgos[trimestre].forEach(rasgo => {
      if (rasgo !== rasgoEditar) {
        maximo -= rasgo.porcentaje;
      }
    });

    this.modalCtrl
      .create({ component: NuevoRasgoComponent, componentProps: { rasgo: rasgoEditar, maximo } })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.role === 'agregar') {
          this.loadingCtrl.create({ message: 'Agregando rasgo...' }).then(cargador => {
            cargador.present();

            let contador = 0;
            // se agrega el nuevo rasgo a cada alumno y al arreglo de rasgos
            this.alumnos.forEach(alumno => {
              alumno.clases[
                alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
              ].rasgos[trimestre].calificacionRasgos.push(null);
              this.alumnosService.actualizarAlumno(alumno).then(() => {
                contador++;
                if (contador === this.alumnos.length + 1) {
                  cargador.dismiss();
                }
              });
            });

            // se agrega el rasgo a la clase
            this.clase.rasgos[trimestre].push(res.data.rasgo);
            this.clasesService.actualizarClase(this.clase).then(() => {
              contador++;
              if (contador === this.alumnos.length + 1) {
                cargador.dismiss();
              }
            });
          });
        } else if (res.role === 'editar') {
          this.loadingCtrl.create({ message: 'Actualizano rasgo...' }).then(cargador => {
            cargador.present();
            // se actualiza el rasgo a la clase
            this.clasesService.actualizarClase(this.clase).then(() => {
              cargador.dismiss();
            });
          });
        }
      });
  }

  abrirCalificarModal(trimestre: string, index: number) {
    const calificaciones = this.alumnos.map(alumno => {
      return {
        alumnoNombre: alumno.nombre,
        alumnoApellido: alumno.apellido,
        calificacion: alumno.clases[
          alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
        ].rasgos[trimestre].calificacionRasgos[index]
      };
    });

    this.modalCtrl
      .create({
        component: CalificarRasgosComponent,
        componentProps: { calificaciones, rasgos: this.clase.rasgos[trimestre], index }
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(res => {
        if (res.data && res.data.editar) {
          this.loadingCtrl.create({ message: 'Asignando calificaciones...' }).then(cargador => {
            cargador.present();
            let contador = 0;
            // se agrega el nuevo rasgo a cada alumno y al arreglo de rasgos
            this.alumnos.forEach((alumno, alIndex) => {
              alumno.clases[
                alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
              ].rasgos[trimestre].calificacionRasgos[index] = res.data.calificaciones[alIndex];

              // se calcula el promedio parcial
              const parcial = this.calcularCalificacionParcial(
                alumno.clases[
                  alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
                ].rasgos[trimestre].calificacionRasgos,
                trimestre
              );

              alumno.clases[
                alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
              ].rasgos[trimestre].calificacionFinal = parcial;

              // se calcula el promedio final
              const final = this.calcularCalificacionFinal(
                alumno.clases[
                  alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
                ].rasgos
              );

              alumno.clases[
                alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
              ].calificacion = final;

              this.alumnosService.actualizarAlumno(alumno).then(() => {
                contador++;
                if (contador === this.alumnos.length) {
                  cargador.dismiss();
                }
              });
            });
          });
        }
        if (res.role === 'siguiente') {
          this.abrirCalificarModal(trimestre, index + 1);
        } else if (res.role === 'anterior') {
          this.abrirCalificarModal(trimestre, index - 1);
        }
      });
  }

  removerRasgo(trimestre: string, index: number) {
    this.alertCtrl.create({
      header: 'Remover rasgo',
      message: '¿Seguro que quieres remover este rasgo?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Remover',
        handler: () => {
          this.loadingCtrl.create({ message: 'Removiendo rasgo...' }).then(cargador => {
            cargador.present();
            // se quita el rasgo de cada alumno
            this.alumnos.forEach(alumno => {
              alumno.clases[
                alumno.clases.findIndex(clase => clase.claseId === this.clase.id)
              ].rasgos[trimestre].calificacionRasgos.splice(index, 1);
              this.alumnosService.actualizarAlumno(alumno);
            });
            // se quita de la clase
            this.clase.rasgos[trimestre].splice(index, 1);
            this.clasesService.actualizarClase(this.clase).then(() => {
              cargador.dismiss();
            });
          });
        }
      }]
    }).then(alerta => {
      alerta.present();
    });
  }

  calcularCalificacionParcial(calificaciones: number[], trimestre: string) {
    let final = 0;
    calificaciones.forEach((calificacion, index) => {
      if (calificacion) {
        final += (this.clase.rasgos[trimestre][index].porcentaje * calificacion) / 100;
      }
    });

    return final;
  }

  calcularCalificacionFinal(trimestres: CalificacionesRasgos) {
    let final = 0;
    for (const key in trimestres) {
      if (trimestres.hasOwnProperty(key)) {
        if (trimestres[key].calificacionFinal) {
          final += trimestres[key].calificacionFinal;
        }
      }
    }

    return final / 3;
  }

  contraerPeriodo1() {
    this.mostrarPeriodo1 = !this.mostrarPeriodo1;
  }

  contraerPeriodo2() {
    this.mostrarPeriodo2 = !this.mostrarPeriodo2;
  }

  contraerPeriodo3() {
    this.mostrarPeriodo3 = !this.mostrarPeriodo3;
  }
}
