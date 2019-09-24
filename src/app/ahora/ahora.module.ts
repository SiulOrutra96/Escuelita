import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhoraPage } from './ahora.page';
import { AhoraRoutingModule } from './ahora-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhoraRoutingModule
  ],
  declarations: [AhoraPage]
})
export class AhoraPageModule {}
