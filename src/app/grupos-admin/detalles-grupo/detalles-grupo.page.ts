import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-grupo',
  templateUrl: './detalles-grupo.page.html',
  styleUrls: ['./detalles-grupo.page.scss'],
})
export class DetallesGrupoPage implements OnInit {

  grupoId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(parametros => {
      if (parametros.has('grupoId')) {
        this.grupoId = parametros.get('grupoId');
      }
    });
  }
}
