import { Component, OnInit, OnDestroy } from '@angular/core';

import { Alumno } from 'src/app/models/alumno.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasesService } from 'src/app/services/clases.service';
import { Clase } from 'src/app/models/clase.model';
import { Subscription } from 'rxjs';
import { Grupo } from 'src/app/models/grupo.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit, OnDestroy {

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
    private alumnosService: AlumnosService,
    private clasesService: ClasesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuarioSub = this.authService.usuarioActual().subscribe(usuario => {
      this.usuario = usuario;
    });
    this.buscando = true;
    this.route.paramMap.subscribe(parametros => {
      if (parametros.has('claseId')) {
        this.claseSub = this.clasesService.obtenerClase(parametros.get('claseId')).subscribe(clase => {
          this.clase = clase;
          this.alumnosSub = this.alumnosService.obtenerAlumnosPorGrupo(this.clase.grupo.id).subscribe(alumnos => {
            this.alumnos = alumnos;
            this.buscando = false;
          });
        });
      } else {
        this.router.navigateByUrl('/clases');
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
}
