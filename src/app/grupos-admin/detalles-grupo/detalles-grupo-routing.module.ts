import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesGrupoPage } from './detalles-grupo.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DetallesGrupoPage,
    children: [
      {
        path: 'alumnos-admin/:grupoId',
        loadChildren: './alumnos-admin/alumnos-admin.module#AlumnosAdminPageModule'
      },
      {
        path: 'clases-admin/:grupoId',
        loadChildren: './clases-admin/clases-admin.module#ClasesAdminPageModule'
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
export class DetallesGrupoRoutingModule {}
