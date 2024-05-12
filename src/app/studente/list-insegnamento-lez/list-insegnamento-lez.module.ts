import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListInsegnamentoLezPage } from './list-insegnamento-lez.page';

const routes: Routes = [
  {
    path: '',
    component: ListInsegnamentoLezPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListInsegnamentoLezPage]
})
export class ListInsegnamentoLezPageModule {}
