import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClasesAdminPage } from './clases-admin.page';
import { NuevaClaseComponent } from './nueva-clase/nueva-clase.component';
import { ClasesAdminRoutingModule } from './clases-admin-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesAdminRoutingModule,
    PipesModule
  ],
  declarations: [
    ClasesAdminPage,
    NuevaClaseComponent
  ],
  entryComponents: [
    NuevaClaseComponent
  ]
})
export class ClasesAdminPageModule {}
