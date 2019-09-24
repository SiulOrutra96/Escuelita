import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasPage } from './asistencias.page';
import { AsistenciasRoutingModule } from './asistencias-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciasRoutingModule
  ],
  declarations: [AsistenciasPage]
})
export class AsistenciasPageModule {}
