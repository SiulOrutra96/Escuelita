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
import { UsuariosService } from './usuarios.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeederService {

  private grupos: Grupo[];

  constructor(
    private alumnosService: AlumnosService,
    private gruposService: GruposService,
    private clasesService: ClasesService,
    private fechasService: FechasService,
    private usuariosService: UsuariosService,
    private authService: AuthService
  ) { }

  main() {
    // this.fechasSeeder();
    // this.maestrosSeeder();
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

  private maestrosSeeder() {
    // this.usuariosService.obtenerMaestros().pipe(take(1)).subscribe(maestros => {
      // if (maestros.length <= 0) {
        // this.authService.crearUsuario(
        //   'maestro1@prueba.com',
        //   '123456'
        // ).then(res => {
        //   this.usuariosService.agregarUsuario(new Usuario(
        //     'Filius',
        //     'Flitwick',
        //     1,
        //     res.user.uid
        //   ));
        // });

        // this.authService.crearUsuario(
        //   'maestro2@prueba.com',
        //   '123456'
        // ).then(res => {
        //   this.usuariosService.agregarUsuario(new Usuario(
        //     'Minerva',
        //     'McGonagall',
        //     1,
        //     res.user.uid
        //   ));
        // });

        // this.authService.crearUsuario(
        //   'maestro3@prueba.com',
        //   '123456'
        // ).then(res => {
        //   this.usuariosService.agregarUsuario(new Usuario(
        //     'Severus',
        //     'Snape',
        //     1,
        //     res.user.uid
        //   ));
        // });

        // this.authService.crearUsuario(
        //   'maestro4@prueba.com',
        //   '123456'
        // ).then(res => {
        //   this.usuariosService.agregarUsuario(new Usuario(
        //     'Remus',
        //     'Lupin',
        //     1,
        //     res.user.uid
        //   ));
        // });
      // }
    // });
  }

  private alumnosSeeder() {
    this.alumnosService.obtenerAlumnos().pipe(take(1)).subscribe(alumnos => {
      if (alumnos.length <= 0) {
        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Luis Arturo Salvador',
          'González López',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          console.log('alumnito: ', alumno);
          this.alumnosService.agregarAlumno(alumno);
        });

        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Peter',
          'Parker',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          this.alumnosService.agregarAlumno(alumno);
        });

        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Anakin',
          'Skywalker',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          this.alumnosService.agregarAlumno(alumno);
        });

        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Padme',
          'Amidala',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          this.alumnosService.agregarAlumno(alumno);
        });

        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Terry',
          'González',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          this.alumnosService.agregarAlumno(alumno);
        });

        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Luke',
          'Skywalker',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          this.alumnosService.agregarAlumno(alumno);
        });

        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Han',
          'Solo',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          this.alumnosService.agregarAlumno(alumno);
        });

        this.alumnosService.inicializarAsistenciasAlumno(new Alumno(
          'Leia',
          'Organa',
          this.obtenerGrupoAleatorio().id
        )).then(alumno => {
          this.alumnosService.agregarAlumno(alumno);
        });

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
      if (clases.length <= 0) {
        this.clasesService.agregarClase(new Clase(
          'Transformaciones',
          [new DiaClase([1], 1)],
          this.obtenerGrupoAleatorio()
        )).then(clase => {
          this.alumnosService.inicializarAsistenciasClase(clase.id);
        });
        this.clasesService.agregarClase(new Clase(
          'Encantamientos',
          [new DiaClase([1, 2, 3], 3)],
          this.obtenerGrupoAleatorio()
        )).then(clase => {
          this.alumnosService.inicializarAsistenciasClase(clase.id);
        });
        this.clasesService.agregarClase(new Clase(
          'Transformaciones',
          [new DiaClase([1, 3, 5], 2)],
          this.obtenerGrupoAleatorio()
        )).then(clase => {
          this.alumnosService.inicializarAsistenciasClase(clase.id);
        });
        this.clasesService.agregarClase(new Clase(
          'Defensa contra las artes oscuras',
          [new DiaClase([2, 4], 3)],
          this.obtenerGrupoAleatorio()
        )).then(clase => {
          this.alumnosService.inicializarAsistenciasClase(clase.id);
        });
        this.clasesService.agregarClase(new Clase(
          'Pociones',
          [new DiaClase([1, 2, 3, 4, 5], 4)],
          this.obtenerGrupoAleatorio()
        )).then(clase => {
          this.alumnosService.inicializarAsistenciasClase(clase.id);
        });
      }
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
