import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClasesService } from '../services/clases.service';
import { Clase } from '../models/clase.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit, OnDestroy {

  clases: Clase[] = [];
  clasesSub: Subscription;
  buscando = false;

  constructor(private clasesService: ClasesService) { }

  ngOnInit() {
    this.clasesSub = this.clasesService.obtenerClases().subscribe(clases => {
      this.clases = clases;
    });
  }

  ngOnDestroy() {
    if (this.clasesSub) {
      this.clasesSub.unsubscribe();
    }
  }

}
