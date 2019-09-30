import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhoraPage } from './ahora.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AhoraPage,
    children: [
      {
        path: 'pase-lista',
        loadChildren: './pase-lista/pase-lista.module#PaseListaPageModule'
      },
      {
        path: 'rasgos',
        loadChildren: './rasgos/rasgos.module#RasgosPageModule'
      },
      {
        path: 'historial',
        loadChildren: './historial/historial.module#HistorialPageModule'
      },
      {
        path: 'estadistico',
        loadChildren: './estadistico/estadistico.module#EstadisticoPageModule'
      },
      {
        path: 'resumen-asistencias',
        loadChildren: './resumen-asistencias/resumen-asistencias.module#ResumenAsistenciasPageModule'
      },
      {
        path: 'graficas',
        loadChildren: './graficas/graficas.module#GraficasPageModule'
      },
      {
        path: '',
        redirectTo: '/ahora/tabs/pase-lista',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/ahora/tabs/pase-lista',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AhoraRoutingModule { }
