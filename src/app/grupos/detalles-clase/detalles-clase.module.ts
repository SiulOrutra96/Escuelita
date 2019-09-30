import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesClasePage } from './detalles-clase.page';
import { DetallesClaseRoutingModule } from './detalles-clase-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesClaseRoutingModule
  ],
  declarations: [DetallesClasePage]
})
export class DetallesClasePageModule {}
