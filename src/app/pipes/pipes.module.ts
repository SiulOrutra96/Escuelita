import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FechaPipe } from './fecha.pipe';


@NgModule({
  declarations: [FechaPipe],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [FechaPipe]
})
export class PipesModule {}
