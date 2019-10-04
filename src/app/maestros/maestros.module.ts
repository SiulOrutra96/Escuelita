import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaestrosPage } from './maestros.page';
import { NuevoMaestroComponent } from './nuevo-maestro/nuevo-maestro.component';

const routes: Routes = [
  {
    path: '',
    component: MaestrosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MaestrosPage,
    NuevoMaestroComponent
  ],
  entryComponents: [NuevoMaestroComponent]
})
export class MaestrosPageModule {}
