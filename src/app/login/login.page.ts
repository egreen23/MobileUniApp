import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authService/auth.service';
import {Events} from '@ionic/angular';
import {UserDTO} from '../../models/userDTO';
import Swal from "sweetalert2";
import {Studente} from '../../models/studente';
import {FirebaseauthService} from '../../services/authService/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    user: UserDTO = {} as UserDTO;
    studente: Studente = {} as Studente;


    matricola: number;
    psw: string;

    showPass: boolean = false;
    type: string = 'password';


    constructor(
        public authService: AuthService,
        public router: Router,
        private event: Events,
        public fireauthService: FirebaseauthService
    )
    { }

    ngOnInit() {
    }


    doLogin() {
        this.authService.login(this.matricola, this.psw)
            .subscribe(data => {

                this.user = data
                this.event.publish('parsing:data', this.user);

            if (this.authService.isLoggedIn) {
                if (data.tipo === 'docente') {
                    this.authService.isLoggedInDoc = true;
                    let redirect1 = `/home-docente/${data.idMatricola}`;
                    // let redirect1 = `calendario-lez-doc/${this.user.idDocente}`;
                    this.router.navigateByUrl(redirect1);

                    console.log("LOG DOCENTE");

                    this.Toast.fire({
                        type: 'success',
                        title: `Benvenuto... Prof. ${data.nome} ${data.cognome}`
                    });
                }
                if (data.tipo === 'studente') {
                    this.authService.isLoggedInStud = true;
                    let redirect2 = `/home-studente/${data.idMatricola}`;
                    // let redirect2 = `calendario-lez-doc/${this.user.idStudente}`;
                    this.router.navigateByUrl(redirect2);

                    console.log("LOG STUDENTE");

                    this.Toast.fire({
                        type: 'success',
                        title: `Benvenuto... ${data.nome} ${data.cognome}`
                    });
                }

                this.signInAnonymously();


                // this.Toast.fire({
                //     type: 'success',
                //     title: `Benvenuto... Prof. ${data.nome} ${data.cognome}`
                // });

                // Swal.fire(
                //     'Benvenuto!',
                //     `Prof. ${data.nome} ${data.cognome}`,
                //     'success'
                // );
            }

        });

    }

    // logout() {
    //     this.authService.logout();
    //     this.fireauthService.signOut();
    // }


    showPassword() {
        this.showPass = !this.showPass;
        if (this.showPass) {
            this.type = 'text';
        } else {
            this.type = 'password';
        }
    }


    Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000
    });


    async signInAnonymously() {
        await this.fireauthService.anonymousLogin();
        return await this.afterSignIn();
    }

    private afterSignIn() {
        // Do after login stuff here, such router redirects, toast messages, etc.
        // return this.router.navigate(['/']);
        console.log('firebase');
        return;
    }






    //
    // // docente = new Docente('', '','','','','' +
    // //     '','','', '');
    //
    // docente: Docente = {} as Docente;
    //
    //
    // constructor(private router: Router,
    //             private logService: DocenteService,
    //             private event: Events) {
    // }
    //
    // ngOnInit() {
    // }
    //
    //
    // //STAMPA I RISULATATI DELLE GET IN HTML
    // get diagnostic() {
    //     return JSON.stringify(this.docente);
    // }
    //
    // doLogin() {
    //
    //         this.logService.getDocenteByMatricola(this.docente.idMatricola)
    //             .subscribe(data => this.docente = data);
    //
    //     this.event.publish('parsing:data', this.docente);
    //
    //         console.log('click LOGIN ok');
    //         console.log(this.docente.idMatricola);
    //         //this.router.navigate(`home-docente/${this.docente.idMatricola}`);
    //         // this.router.navigate(['home-docente']);
    //         this.router.navigateByUrl(`home-docente/${this.docente.idMatricola}`);
    //     }





}
