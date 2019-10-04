import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { GruposService } from 'src/app/services/grupos.service';
import { Grupo } from 'src/app/models/grupo.model';
import { Clase, DiaClase, HoraClase } from 'src/app/models/clase.model';
import { DiaSemana } from 'src/app/models/fecha.model';
import { ClasesService } from 'src/app/services/clases.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.scss'],
})
export class NuevaClaseComponent implements OnInit {

  @Input() clase: Clase;
  @Input() grupoId: string;
  HorasClase = Object.keys(HoraClase).map(key => HoraClase[key]).filter(value => typeof value === 'string') as string[];
  diasSemana = Object.keys(DiaSemana).map(key => DiaSemana[key]).filter(value => typeof value === 'string') as string[];
  diasSemanaRestantes = [];
  grupos: Grupo[] = [];
  maestros: Usuario[] = [];

  buscando = false;
  agregar = false;

  constructor(
    private gruposService: GruposService,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    if (this.clase) {
      this.agregar = false;
    } else {
      this.clase = new Clase();
      this.agregar = true;
    }

    this.buscando = true;
    this.gruposService.obtenerGrupos().pipe(take(1)).subscribe(grupos => {
      this.grupos = grupos;
      if (this.grupoId) {
        this.clase.grupo = this.grupos.find(grupo => grupo.id === this.grupoId);
      }
      this.usuariosService.obtenerMaestros().pipe(take(1)).subscribe(maestros => {
        this.maestros = maestros;
        this.buscando = false;
      });
    });
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
    this.clase.dias.push(new DiaClase());
  }

  removerDia() {
    this.clase.dias.pop();
  }

  agregarClase(claseForm: NgForm) {
    if (claseForm.invalid) {
      return;
    }

    this.clase.grupo = this.grupos.find(grupo => grupo.id === claseForm.value.grupo);
    console.log('clase: ', this.clase);

    if (this.agregar) {
      this.modalCtrl.dismiss({
        clase: this.clase
      }, 'agregar');
    } else {
      this.modalCtrl.dismiss({
        clase: this.clase
      }, 'editar');
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
