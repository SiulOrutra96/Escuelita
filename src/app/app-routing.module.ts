import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'ahora', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'ahora', loadChildren: './ahora/ahora.module#AhoraPageModule', canLoad: [AuthGuard] },
  { path: 'asistencias', loadChildren: './asistencias/asistencias.module#AsistenciasPageModule', canLoad: [AuthGuard] },
  { path: 'clases', loadChildren: './clases/clases.module#ClasesPageModule', canLoad: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
