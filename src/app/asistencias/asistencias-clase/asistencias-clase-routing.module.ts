import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciasClasePage } from './asistencias-clase.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AsistenciasClasePage,
    children: [
      {
        path: 'historial/:claseId',
        loadChildren: '../../ahora/historial/historial.module#HistorialPageModule'
      },
      {
        path: 'estadistico/:claseId',
        loadChildren: '../../ahora/estadistico/estadistico.module#EstadisticoPageModule'
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
export class AsistenciasClaseRoutingModule {}
