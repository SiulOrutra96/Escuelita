import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClasesPage } from './clases.page';
import { NuevaClaseComponent } from './nueva-clase/nueva-clase.component';
import { ClasesRoutingModule } from './clases-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesRoutingModule
  ],
  declarations: [
    ClasesPage,
    NuevaClaseComponent
  ],
  entryComponents: [
    NuevaClaseComponent
  ]
})
export class ClasesPageModule {}
