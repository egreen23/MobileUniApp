import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

interface UserFire {
    uid: string;
    /*email?: string | null;
    photoURL?: string;
    displayName?: string;*/
}

@Injectable()
export class FirebaseauthService {

    user: Observable<UserFire | null>;


    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router) {}


    anonymousLogin() {
        return this.afAuth.auth
            .signInAnonymously()
            .then(credential => {
                // this.notify.update('Welcome to Firestarter!!!', 'success');
                return this.updateUserData(credential.user); // if using firestore
            });
    }

    // Sets user data to firestore after succesful login
    private updateUserData(user: UserFire) {
        const userRef: AngularFirestoreDocument<UserFire> = this.afs.doc(
            `users/${user.uid}`
        );

        const data: UserFire = {
            uid: user.uid
        };
        return userRef.set(data);
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            // this.router.navigate(['/']);
        });
    }
}
