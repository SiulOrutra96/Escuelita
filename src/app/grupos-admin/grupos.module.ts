import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GruposPage } from './grupos.page';
import { GruposRoutingModule } from './grupos-routing.module';
import { NuevoGrupoComponent } from './nuevo-grupo/nuevo-grupo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GruposRoutingModule
  ],
  declarations: [
    GruposPage,
    NuevoGrupoComponent
  ],
  entryComponents: [NuevoGrupoComponent]
})
export class GruposPageModule {}
