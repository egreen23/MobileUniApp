import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarioLezStudPage } from './calendario-lez-stud.page';
import {NgCalendarModule} from 'ionic2-calendar';

const routes: Routes = [
  {
    path: '',
    component: CalendarioLezStudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule
  ],
  declarations: [CalendarioLezStudPage]
})
export class CalendarioLezStudPageModule {}
