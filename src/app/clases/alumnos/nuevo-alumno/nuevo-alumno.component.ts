import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Alumno } from '../../../models/alumno.model';
import { AlumnosService } from '../../../services/alumnos.service';
import { Subscription } from 'rxjs';
import { Grupo } from 'src/app/models/grupo.model';
import { GruposService } from 'src/app/services/grupos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit, OnDestroy {

  @Input() alumnoId: string;
  @Input() grupoId: string;
  alumno: Alumno;
  grupos: Grupo[] = [];
  gruposSub: Subscription;
  alumnosSub: Subscription;
  buscando = false;
  alumnoForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private alumnoService: AlumnosService,
    private gruposService: GruposService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.inicializarFormulario(null, null, null);
    this.gruposSub = this.gruposService.obtenerGrupos().subscribe(grupos => {
      this.grupos = grupos;
      if (this.alumnoId) {
        this.alumnosSub = this.alumnoService.obtenerAlumno(this.alumnoId).subscribe(alumno => {
          this.alumno = alumno;
          this.alumnoForm.value.nombre = alumno.nombre;
          this.alumnoForm.value.apellido = alumno.apellido;
          this.inicializarFormulario(alumno.nombre, alumno.apellido, alumno.grupoId);
          this.cdr.markForCheck();
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.gruposSub) {
      this.gruposSub.unsubscribe();
    }

    if (this.alumnosSub) {
      this.alumnosSub.unsubscribe();
    }
  }

  inicializarFormulario(nombre: string, apellido: string, grupoId: string) {
    this.alumnoForm = new FormGroup({
      nombre: new FormControl(nombre, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      apellido: new FormControl(apellido, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      grupoId: new FormControl(grupoId, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  agregarAlumno() {
    if (this.alumnoForm.invalid) {
      return;
    }

    const nuevoAlumno = new Alumno(
      this.alumnoForm.value.nombre,
      this.alumnoForm.value.apellido,
      this.grupoId
    );
    this.modalCtrl.dismiss({
      alumno: nuevoAlumno
    }, 'agregar');
  }

  editarAlumno() {
    if (this.alumnoForm.invalid) {
      return;
    }

    this.alumno.nombre = this.alumnoForm.value.nombre;
    this.alumno.apellido = this.alumnoForm.value.apellido;
    this.modalCtrl.dismiss({
      alumno: this.alumno
    }, 'editar');
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
