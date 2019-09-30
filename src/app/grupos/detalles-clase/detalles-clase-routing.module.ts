import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesClasePage } from './detalles-clase.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DetallesClasePage,
    children: [
      {
        path: 'estadistico/:claseId',
        loadChildren: '../../ahora/estadistico/estadistico.module#EstadisticoPageModule'
      },
      {
        path: 'historial/:claseId',
        loadChildren: '../../ahora/historial/historial.module#HistorialPageModule'
      },
      {
        path: 'resumen-asistencias/:claseId',
        loadChildren: '../../ahora/resumen-asistencias/resumen-asistencias.module#ResumenAsistenciasPageModule'
      },
      {
        path: 'graficas/:claseId',
        loadChildren: '../../ahora/graficas/graficas.module#GraficasPageModule'
      },
      {
        path: '',
        redirectTo: '/asistencias',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: ':claseId',
    redirectTo: '/asistencias',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DetallesClaseRoutingModule {}
