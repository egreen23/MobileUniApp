import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListInsegnamentoLezDocPage } from './list-insegnamento-lez-doc.page';

const routes: Routes = [
  {
    path: '',
    component: ListInsegnamentoLezDocPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListInsegnamentoLezDocPage]
})
export class LisInsegnamentoLezDocPageModule {}
