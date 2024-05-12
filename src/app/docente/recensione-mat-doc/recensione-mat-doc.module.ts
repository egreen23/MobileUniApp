import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecensioneMatDocPage } from './recensione-mat-doc.page';

const routes: Routes = [
  {
    path: '',
    component: RecensioneMatDocPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecensioneMatDocPage]
})
export class RecensioneMatDocPageModule {}
