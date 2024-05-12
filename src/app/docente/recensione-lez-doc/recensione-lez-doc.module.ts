import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecensioneLezDocPage } from './recensione-lez-doc.page';

const routes: Routes = [
  {
    path: '',
    component: RecensioneLezDocPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecensioneLezDocPage]
})
export class RecensioneLezDocPageModule {}
