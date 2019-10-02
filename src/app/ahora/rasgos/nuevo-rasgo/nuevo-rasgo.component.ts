import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Rasgo } from 'src/app/models/clase.model';

@Component({
  selector: 'app-nuevo-rasgo',
  templateUrl: './nuevo-rasgo.component.html',
  styleUrls: ['./nuevo-rasgo.component.scss'],
})
export class NuevoRasgoComponent implements OnInit {

  @Input() rasgo: Rasgo;
  @Input() maximo: number;
  agregar = true;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if (this.rasgo) {
      this.agregar = false;
    } else {
      this.rasgo = new Rasgo();
      this.agregar = true;
    }
  }

  agregarRasgo(rasgoForm: NgForm) {
    if (rasgoForm.invalid ||
      rasgoForm.value.porcentaje > this.maximo ||
      rasgoForm.value.porcentaje < 0
    ) {
      return;
    }

    this.rasgo.nombre = rasgoForm.value.nombre;
    this.rasgo.porcentaje = rasgoForm.value.porcentaje;

    if (this.agregar) {
      this.modalCtrl.dismiss({
        rasgo: this.rasgo
      }, 'agregar');
    } else {
      this.modalCtrl.dismiss({
        rasgo: this.rasgo
      }, 'editar');
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
