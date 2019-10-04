import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClasesAdminPage } from './clases-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesAdminPage
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
export class ClasesAdminRoutingModule { }
