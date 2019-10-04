import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlumnosAdminPage } from './alumnos-admin.page';
import { NuevoAlumnoComponent } from './nuevo-alumno/nuevo-alumno.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosAdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AlumnosAdminPage,
    NuevoAlumnoComponent
  ],
  entryComponents: [
    NuevoAlumnoComponent
  ]
})
export class AlumnosAdminPageModule {}
