import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResumenAsistenciasPage } from './resumen-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenAsistenciasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResumenAsistenciasPage]
})
export class ResumenAsistenciasPageModule {}
