import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Clase } from '../models/clase.model';
import { ClasesService } from 'src/app/services/clases.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit, OnDestroy {

  grupoId: string;
  clases: Clase[] = [];
  clasesSub: Subscription;
  usuario: Usuario;
  authSub: Subscription;
  buscando = false;

  constructor(
    private clasesService: ClasesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buscando = true;
    this.authSub = this.authService.usuarioActual().subscribe(usuario => {
      this.usuario = usuario;
      if (usuario) {
        this.clasesSub = this.clasesService.obtenerClasesPorMaestro(usuario.id).subscribe(clases => {
          this.clases = clases;
          this.buscando = false;
        });
      }
    });

  }

  ngOnDestroy() {
    if (this.clasesSub) {
      this.clasesSub.unsubscribe();
    }

    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
