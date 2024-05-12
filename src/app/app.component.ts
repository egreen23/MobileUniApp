import { Component } from '@angular/core';

import {Events, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Docente} from '../models/docente';
import {UserDTO} from '../models/userDTO';
import {Studente} from '../models/studente';
import {StudenteService} from '../services/studenteService/studente.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

    user: UserDTO = {} as UserDTO;
    studente: Studente = {} as Studente;


    public appPages = [];

    // public appPages =
    //         [
    //             {
    //                 title: 'Home',
    //                 url: `/home-docente/${this.user.idMatricola}`,
    //                 icon: 'home-docente'
    //             },
    //             {
    //                 title: 'Calendario Lezioni',
    //                 url: `/calendario-lez-doc/${this.user.idDocente}`,
    //                 icon: 'calendar'
    //             },
    //             {
    //                 title: 'Aule',
    //                 url: '/list-aule',
    //                 icon: 'business'
    //             }
    //         ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private event: Events,
    private studService: StudenteService
  ) {

    this.initializeApp();

      event.subscribe('parsing:data', (user) => {
          this.user = user;

          // event.subscribe('parsing:data', (studente) => {
          //     this.studente = studente;

              console.log(this.user.idMatricola +" "+ this.user.tipo);
              // console.log(this.studente.idMatricola +" "+ this.studente.nomeCorsoDiStudio);

          if (this.user.tipo === 'docente') {
              this.appPages =
              [
                  {
                      title: 'Home',
                      url: `/home-docente/${this.user.idMatricola}`,
                      icon: 'home'
                  },
                  {
                      title: 'Calendario Lezioni',
                      url: `/calendario-lez-doc/${this.user.idDocente}`,
                      icon: 'calendar'
                  },
                  {
                      title: 'Aule',
                      url: '/list-aule',
                      icon: 'business'
                  },
                  {
                      title: 'Recensione Mat. Didattico',
                      url: `/list-insegnamento-mat-doc/${this.user.idDocente}`,
                      icon: 'folder'
                  },
                  {
                      title: 'Recensione Lezione',
                      url: `/list-insegnamento-lez-doc/${this.user.idDocente}`,
                      icon: 'create'
                  }
              ];
          }
          else if (this.user.tipo === 'studente') {
              this.studService.getStudenteByMatricola(this.user.idMatricola)
                  .subscribe(data =>{
                      this.studente = data;

                console.log(this.studente.idMatricola +" "+ this.studente.nomeCorsoDiStudio);


              this.appPages =
              [
                  {
                      title: 'Home',
                      url: `/home-studente/${this.user.idMatricola}`,
                      icon: 'home'
                  },
                  {
                      title: 'Calendario Lezioni',
                      url: `/calendario-lez-stud/${this.user.idMatricola}`,
                      icon: 'calendar'
                  },
                  {
                      title: 'Aule',
                      url: '/list-aule',
                      icon: 'business'
                  },
                  {
                      title: 'Materiale Didattico',
                      url: `/list-insegnamento-mat/${this.studente.idCorsoDiStudio}/${this.user.idMatricola}/${this.studente.idStudente}`,
                      icon: 'folder'
                  },
                  {
                      title: 'Recensione Lezione',
                      url: `/list-insegnamento-lez/${this.studente.idCorsoDiStudio}/${this.user.idMatricola}/${this.studente.idStudente}`,
                      icon: 'create'
                  }

              ];
                 });
          }
      });



  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
