import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { Clase } from '../models/clase.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit, OnDestroy {

  clases: Clase[] = [];
  clasesSub: Subscription;
  authSub: Subscription;
  buscando = false;

  constructor(
    private clasesService: ClasesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buscando = true;
    this.authSub = this.authService.usuarioActual().subscribe(usuario => {
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
