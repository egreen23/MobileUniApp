import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListInsegnamentoMatDocPage } from './list-insegnamento-mat-doc.page';

const routes: Routes = [
  {
    path: '',
    component: ListInsegnamentoMatDocPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListInsegnamentoMatDocPage]
})
export class LisInsegnamentoMatDocPageModule {}
