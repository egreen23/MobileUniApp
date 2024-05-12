import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecensioneLezPage } from './recensione-lez.page';

const routes: Routes = [
  {
    path: '',
    component: RecensioneLezPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecensioneLezPage]
})
export class RecensioneLezPageModule {}
