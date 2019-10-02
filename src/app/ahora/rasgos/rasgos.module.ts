import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RasgosPage } from './rasgos.page';
import { NuevoRasgoComponent } from './nuevo-rasgo/nuevo-rasgo.component';
import { ListaRasgosComponent } from './lista-rasgos/lista-rasgos.component';
import { CalificarRasgosComponent } from './calificar-rasgos/calificar-rasgos.component';

const routes: Routes = [
  {
    path: '',
    component: RasgosPage
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
    RasgosPage,
    ListaRasgosComponent,
    NuevoRasgoComponent,
    CalificarRasgosComponent
  ],
  entryComponents: [
    NuevoRasgoComponent,
    CalificarRasgosComponent
  ]
})
export class RasgosPageModule {}
