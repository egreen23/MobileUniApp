import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {FirebaseauthService} from '../../services/authService/firebaseauth.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      AngularFireMessagingModule,
      AngularFireFunctionsModule
  ],
  declarations: [LoginPage],
    providers: [
        FirebaseauthService
    ]
})
export class LoginPageModule {}
