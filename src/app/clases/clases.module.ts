import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClasesPage } from './clases.page';
import { ClasesRoutingModule } from './clases-routing.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesRoutingModule,
    PipesModule
  ],
  declarations: [
    ClasesPage
  ]
})
export class ClasesPageModule {}
