import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlumnosPage } from './alumnos.page';
import { NuevoAlumnoComponent } from './nuevo-alumno/nuevo-alumno.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AlumnosPage,
    NuevoAlumnoComponent
  ],
  entryComponents: [
    NuevoAlumnoComponent
  ]
})
export class AlumnosPageModule {}
