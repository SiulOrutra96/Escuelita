import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasClasePage } from './asistencias-clase.page';
import { AsistenciasClaseRoutingModule } from './asistencias-clase-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciasClaseRoutingModule
  ],
  declarations: [AsistenciasClasePage]
})
export class AsistenciasClasePageModule {}
