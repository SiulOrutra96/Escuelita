import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AntiAuthGuard } from './auth/anti-auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'ahora',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule'
  },
  {
    path: 'inicio',
    loadChildren: './inicio/inicio.module#InicioPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'ahora',
    loadChildren: './ahora/ahora.module#AhoraPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'clases',
    loadChildren: './clases/clases.module#ClasesPageModule',
    canLoad: [AuthGuard] },
  {
    path: 'grupos',
    loadChildren: './grupos-admin/grupos.module#GruposPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'detalles-clase-admin',
    loadChildren: './grupos-admin/detalles-grupo/clases-admin/detalles-clase-admin/detalles-clase-admin.module#DetallesClaseAdminPageModule',
    canLoad: [AuthGuard] },
  {
    path: 'maestros',
    loadChildren: './maestros/maestros.module#MaestrosPageModule',
    canLoad: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
