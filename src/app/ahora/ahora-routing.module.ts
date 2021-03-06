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
        path: 'historial',
        loadChildren: './historial/historial.module#HistorialPageModule'
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
  { path: 'historial', loadChildren: './historial/historial.module#HistorialPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AhoraRoutingModule { }
