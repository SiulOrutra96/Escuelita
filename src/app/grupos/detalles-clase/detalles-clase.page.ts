import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalles-clase',
  templateUrl: './detalles-clase.page.html',
  styleUrls: ['./detalles-clase.page.scss'],
})
export class DetallesClasePage implements OnInit {

  claseId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(parametros => {
      if (!parametros.has('claseId')) {
        this.router.navigateByUrl('/grupos');
      }

      this.claseId = parametros.get('claseId');
    });
  }
}
