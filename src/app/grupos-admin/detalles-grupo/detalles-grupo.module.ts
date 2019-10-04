import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesGrupoPage } from './detalles-grupo.page';
import { DetallesGrupoRoutingModule } from './detalles-grupo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesGrupoRoutingModule
  ],
  declarations: [DetallesGrupoPage]
})
export class DetallesGrupoPageModule {}
