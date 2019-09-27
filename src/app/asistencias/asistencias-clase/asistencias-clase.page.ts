import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asistencias-clase',
  templateUrl: './asistencias-clase.page.html',
  styleUrls: ['./asistencias-clase.page.scss'],
})
export class AsistenciasClasePage implements OnInit {

  claseId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(parametros => {
      if (!parametros.has('claseId')) {
        this.router.navigateByUrl('/asistencias');
      }

      this.claseId = parametros.get('claseId');
    });
  }
}
