import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FechaPipe } from './fecha.pipe';
import { PeriodoPipe } from './periodo.pipe';


@NgModule({
  declarations: [
    FechaPipe,
    PeriodoPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    FechaPipe,
    PeriodoPipe
  ]
})
export class PipesModule { }
