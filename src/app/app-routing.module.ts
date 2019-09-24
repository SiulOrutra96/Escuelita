import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ahora', pathMatch: 'full' },
  { path: 'ahora', loadChildren: './ahora/ahora.module#AhoraPageModule' },
  { path: 'asistencias', loadChildren: './asistencias/asistencias.module#AsistenciasPageModule' },
  { path: 'clases', loadChildren: './clases/clases.module#ClasesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
