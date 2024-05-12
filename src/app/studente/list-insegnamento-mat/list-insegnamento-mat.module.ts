import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListInsegnamentoMatPage } from './list-insegnamento-mat.page';

const routes: Routes = [
  {
    path: '',
    component: ListInsegnamentoMatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListInsegnamentoMatPage]
})
export class ListInsegnamentoPageModule {}
