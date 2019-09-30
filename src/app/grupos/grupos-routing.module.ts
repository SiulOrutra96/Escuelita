import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GruposPage } from './grupos.page';

const routes: Routes = [
  {
    path: '',
    component: GruposPage
  },
  {
    path: ':claseId',
    loadChildren: './detalles-clase/detalles-clase.module#DetallesClasePageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
