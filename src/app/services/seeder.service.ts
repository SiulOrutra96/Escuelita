import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AlumnosService } from './alumnos.service';
import { GruposService } from './grupos.service';
import { ClasesService } from './clases.service';
import { Alumno } from '../models/alumno.model';
import { Grupo } from '../models/grupo.model';
import { Clase, DiaClase } from '../models/clase.model';
import { FechasService } from './fechas.service';
import { Fecha } from '../models/fecha.model';

@Injectable({
  providedIn: 'root'
})
export class SeederService {

  private grupos: Grupo[];

  constructor(
    private alumnosService: AlumnosService,
    private gruposService: GruposService,
    private clasesService: ClasesService,
    private fechasService: FechasService
  ) { }

  main() {
    // this.fechasSeeder();
    // this.gruposService.obtenerGrupos().pipe(take(1)).subscribe(grupos => {
    //   this.grupos = grupos;
    //   // this.gruposSeeder();
    //   // this.alumnosSeeder();
    //   // this.clasesSeeder();
    // });
  }

  obtenerGrupoAleatorio() {
    const aleatorio = Math.round(Math.random() * (this.grupos.length - 1));
    return this.grupos[aleatorio];
  }

  private alumnosSeeder() {
    this.alumnosService.obtenerAlumnos().pipe(take(1)).subscribe(alumnos => {
      if (alumnos.length <= 0) {
        this.alumnosService.agregarAlumno(new Alumno(
          'Luis Arturo Salvador',
          'González López',
          this.obtenerGrupoAleatorio().id
        ));
        this.alumnosService.agregarAlumno(new Alumno(
          'Peter',
          'Parker',
          this.obtenerGrupoAleatorio().id
        ));
        this.alumnosService.agregarAlumno(new Alumno(
          'Anakin',
          'Skywalker',
          this.obtenerGrupoAleatorio().id
        ));
        this.alumnosService.agregarAlumno(new Alumno(
          'Padme',
          'Amidala',
          this.obtenerGrupoAleatorio().id
        ));
        this.alumnosService.agregarAlumno(new Alumno(
          'Terry',
          'González',
          this.obtenerGrupoAleatorio().id
        ));
        this.alumnosService.agregarAlumno(new Alumno(
          'Luke',
          'Skywalker',
          this.obtenerGrupoAleatorio().id
        ));
        this.alumnosService.agregarAlumno(new Alumno(
          'Han',
          'Solo',
          this.obtenerGrupoAleatorio().id
        ));
        this.alumnosService.agregarAlumno(new Alumno(
          'Leia',
          'Organa',
          this.obtenerGrupoAleatorio().id
        ));

        this.alumnosService.asignarNumeroLista(this.grupos);
      }
    });
  }

  private gruposSeeder() {
    if (this.grupos.length <= 0) {
      this.gruposService.agregarGrupo(new Grupo('1° A'));
      this.gruposService.agregarGrupo(new Grupo('2° A'));
      this.gruposService.agregarGrupo(new Grupo('3° A'));
      // this.gruposService.agregarGrupo(new Grupo('1 B'));
      // this.gruposService.agregarGrupo(new Grupo('2 B'));
      // this.gruposService.agregarGrupo(new Grupo('3 B'));
      // this.gruposService.agregarGrupo(new Grupo('1 C'));
      // this.gruposService.agregarGrupo(new Grupo('2 C'));
      // this.gruposService.agregarGrupo(new Grupo('3 C'));
    }
  }

  private clasesSeeder() {
    this.clasesService.obtenerClases().pipe(take(1)).subscribe(clases => {
      // if (clases.length <= 0) {
        // this.clasesService.agregarClase(new Clase(
        //   'Matemáticas',
        //   [new DiaClase([1], 1)],
        //   this.obtenerGrupoAleatorio()
        // )).then(clase => {
        //   this.alumnosService.inicializarAsistenciasClase(clase.id);
        // });
        // this.clasesService.agregarClase(new Clase(
        //   'Matemáticas',
        //   [new DiaClase([1, 2, 3], 3)],
        //   this.obtenerGrupoAleatorio()
        // )).then(clase => {
        //   this.alumnosService.inicializarAsistenciasClase(clase.id);
        // });
        // this.clasesService.agregarClase(new Clase(
        //   'Español',
        //   [new DiaClase([1, 3, 5], 2)],
        //   this.obtenerGrupoAleatorio()
        // )).then(clase => {
        //   this.alumnosService.inicializarAsistenciasClase(clase.id);
        // });
        // this.clasesService.agregarClase(new Clase(
        //   'Español',
        //   [new DiaClase([2, 4], 3)],
        //   this.obtenerGrupoAleatorio()
        // )).then(clase => {
        //   this.alumnosService.inicializarAsistenciasClase(clase.id);
        // });
        // this.clasesService.agregarClase(new Clase(
        //   'Computación',
        //   [new DiaClase([1, 2, 3, 4, 5], 4)],
        //   this.obtenerGrupoAleatorio()
        // )).then(clase => {
        //   this.alumnosService.inicializarAsistenciasClase(clase.id);
        // });
      // }
    });
  }

  private fechasSeeder() {
    this.fechasService.obtenerFechasInhabiles().pipe(take(1)).subscribe(fechas => {
      if (fechas.length <= 0) {
        // vacaciones
        this.fechasService.agregarFecha(new Fecha('2019-08-01', false, true, false));
        this.fechasService.agregarFecha(new Fecha('2019-08-25', false, false, true));
        this.fechasService.agregarFecha(new Fecha('2019-12-23', false, true, false));
        this.fechasService.agregarFecha(new Fecha('2020-01-07', false, false, true));
        this.fechasService.agregarFecha(new Fecha('2020-04-06', false, true, false));
        this.fechasService.agregarFecha(new Fecha('2020-04-17', false, false, true));
        this.fechasService.agregarFecha(new Fecha('2020-07-06', false, true, false));
        this.fechasService.agregarFecha(new Fecha('2020-07-31', false, false, true));

        // días festivos
        this.fechasService.agregarFecha(new Fecha('2019-09-16', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2019-11-18', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2019-12-25', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-01-01', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-02-03', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-03-16', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-05-01', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-05-05', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-05-15', false, false, false));

        // consejo técnico
        this.fechasService.agregarFecha(new Fecha('2019-10-04', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2019-11-15', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2019-12-20', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-01-31', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-03-13', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-05-04', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-06-05', false, false, false));
        this.fechasService.agregarFecha(new Fecha('2020-07-07', false, false, false));

        this.fechasService.calcularFechasHabiles();
      }
    });
  }
}
