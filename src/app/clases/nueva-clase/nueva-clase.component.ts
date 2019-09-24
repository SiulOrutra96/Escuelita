import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { GruposService } from 'src/app/services/grupos.service';
import { Grupo } from 'src/app/models/grupo.model';
import { Clase, DiaClase, HoraClase } from 'src/app/models/clase.model';
import { DiaSemana } from 'src/app/models/fecha.model';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.scss'],
})
export class NuevaClaseComponent implements OnInit, OnDestroy {

  @Input() claseId: string;
  HorasClase = Object.keys(HoraClase).map(key => HoraClase[key]).filter(value => typeof value === 'string') as string[];
  diasSemana = Object.keys(DiaSemana).map(key => DiaSemana[key]).filter(value => typeof value === 'string') as string[];
  diasSemanaRestantes = [];
  grupos: Grupo[] = [];
  gruposSub: Subscription;

  clase: Clase;
  buscando = false;
  nombre: string;
  grupo: Grupo = new Grupo();
  dias: DiaClase[] = [];


  constructor(
    private clasesService: ClasesService,
    private gruposService: GruposService,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.agregarDia();
    this.gruposSub = this.gruposService.obtenerGrupos().subscribe(grupos => {
      this.grupos = grupos;

      if (this.claseId) {
        this.clasesService.obtenerClase(this.claseId).subscribe(clase => {
          this.clase = clase;
          this.nombre = clase.nombre;
          this.grupo = clase.grupo;
          this.dias = clase.dias;
          this.cdr.markForCheck();
        });
      }
    });
  }

  ngOnDestroy() {
    this.gruposSub.unsubscribe();
  }

  // TODO - hacer que funcione
  // diasSeleccionados(evento: CustomEvent, indice: number) {
  //   console.log('evento: ', evento);
  //   const diasSeleccionados = evento.detail.value.map(index => {
  //     return this.diasSemanaRestantes[indice][index];
  //   });
  //   console.log('dias: ', diasSeleccionados);

  //   this.diasSemanaRestantes.forEach((diasRestantes, index) => {
  //     if (index !== indice) {
  //       diasRestantes = diasRestantes.filter(dia => {
  //         if (diasSeleccionados.indexOf(dia) < 0) {
  //           return dia;
  //         }
  //       });
  //     }
  //   });
  //   console.log('restantes: ', this.diasSemanaRestantes);
  // }

  agregarDia() {
    this.dias.push(new DiaClase());
  }

  removerDia() {
    this.dias.pop();
  }

  agregarClase(claseForm: NgForm) {
    if (claseForm.invalid) {
      return;
    }

    const nuevaClase = new Clase(
      claseForm.value.nombre,
      this.dias,
      this.grupos.find(grupo => grupo.id === claseForm.value.grupo)
    );

    this.modalCtrl.dismiss({
      clase: nuevaClase
    }, 'agregar');
  }

  editarClase(claseForm: NgForm) {
    if (claseForm.invalid) {
      return;
    }

    const nuevaClase = new Clase(
      claseForm.value.nombre,
      this.dias,
      this.grupos.find(grupo => grupo.id === claseForm.value.grupo),
      this.claseId
    );

    this.modalCtrl.dismiss({
      clase: nuevaClase
    }, 'editar');
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
