import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesClaseAdminPage } from './detalles-clase-admin.page';
import { DetallesClaseAdminRoutingModule } from './detalles-clase-admin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesClaseAdminRoutingModule
  ],
  declarations: [DetallesClaseAdminPage]
})
export class DetallesClaseAdminPageModule {}
