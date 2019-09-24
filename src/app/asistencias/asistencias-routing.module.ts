import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AsistenciasPage } from './asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AsistenciasRoutingModule { }
