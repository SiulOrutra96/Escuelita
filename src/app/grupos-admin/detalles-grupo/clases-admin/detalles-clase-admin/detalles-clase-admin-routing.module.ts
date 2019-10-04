import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesClaseAdminPage } from './detalles-clase-admin.page';

const routes: Routes = [
  {
    path: ':claseId',
    component: DetallesClaseAdminPage,
    children: [
      {
        path: 'estadistico/:claseId',
        loadChildren: '../../../../ahora/estadistico/estadistico.module#EstadisticoPageModule'
      },
      {
        path: 'historial/:claseId',
        loadChildren: '../../../../ahora/historial/historial.module#HistorialPageModule'
      },
      {
        path: 'graficas/:claseId',
        loadChildren: '../../../../ahora/graficas/graficas.module#GraficasPageModule'
      },
      {
        path: '',
        redirectTo: '/grupos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/grupos',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DetallesClaseAdminRoutingModule { }
