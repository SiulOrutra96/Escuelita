import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Alumno } from '../../../../models/alumno.model';
import { AlumnosService } from '../../../../services/alumnos.service';
import { Subscription } from 'rxjs';
import { Grupo } from 'src/app/models/grupo.model';
import { GruposService } from 'src/app/services/grupos.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit, OnDestroy {

  @Input() alumno: Alumno;
  @Input() grupoId: string;
  grupos: Grupo[] = [];
  gruposSub: Subscription;
  alumnosSub: Subscription;
  buscando = false;
  agregar = false;

  constructor(
    private modalCtrl: ModalController,
    private alumnoService: AlumnosService,
    private gruposService: GruposService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.alumno) {
      this.agregar = false;
    } else {
      this.alumno = new Alumno();
      this.alumno.grupoId = this.grupoId;
      this.agregar = true;
    }

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
  }

  agregarAlumno(alumnoForm: NgForm) {
    if (alumnoForm.invalid) {
      return;
    }

    if (this.agregar) {
      this.modalCtrl.dismiss({
        alumno: this.alumno
      }, 'agregar');
    } else {
      this.modalCtrl.dismiss({
        alumno: this.alumno
      }, 'editar');
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
