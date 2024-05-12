import { Component, OnInit } from '@angular/core';
import {Insegnamento} from '../../models/insegnamento';
import {UserDTO} from '../../models/userDTO';
import {Docente} from '../../models/docente';
import {Studente} from '../../models/studente';
import {Events, ToastController} from '@ionic/angular';
import {InsegnamentoService} from '../../services/insegnamentoService/insegnamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StudenteService} from '../../services/studenteService/studente.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {DocenteService} from '../../services/docenteService/docente.service';
import {AuthService} from '../../services/authService/auth.service';

@Component({
    selector: 'app-list-people',
    templateUrl: './list-people.page.html',
    styleUrls: ['./list-people.page.scss'],
})
export class ListPeoplePage implements OnInit {


    user: UserDTO = {} as UserDTO;
    stud: Studente = {} as Studente;
    studente: Studente[];
    insegnamento: Insegnamento[];
    docente: Docente = {} as Docente;
    people: UserDTO[] = [];


    constructor(public authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private toastCtrl: ToastController,
                private event: Events,
                private studService: StudenteService,
                private insegnService: InsegnamentoService,
                private fireStore: AngularFirestore,
                private docService: DocenteService

    ) { }

    ngOnInit() {

        this.loadData();
    }


    loadData(){

        const id = +this.route.snapshot.paramMap.get('id');
        console.log(id);
        this.authService.getUserByMatricola(id)
            .subscribe(user => {

                this.user = user;

                if (this.authService.isLoggedIn) {

                    if (this.user.tipo === 'studente') {

                        this.studService.getStudenteByMatricola(this.user.idMatricola)
                            .subscribe(data => {
                                this.stud = data;

                                this.insegnService.getByIdCorso(this.stud.idCorsoDiStudio).subscribe(insegnamenti => {
                                    this.insegnamento = insegnamenti;

                                    this.studService.getAllStudByIdCdS(this.stud.idCorsoDiStudio).subscribe(studenti => {
                                        this.studente = studenti;

                                        this.studente.forEach(student => {

                                            let user = new UserDTO();

                                            user.idMatricola = student.idMatricola;
                                            user.nome = student.nome;
                                            user.cognome = student.cognome;
                                            user.tipo = 'studente'

                                            this.people.push(user);

                                            console.log(this.people);

                                        });

                                        this.insegnamento.forEach(inseg => {

                                            let user = new UserDTO();

                                            user.idMatricola = inseg.idDocente;
                                            user.nome = inseg.nomeDocente;
                                            user.cognome = inseg.cognomeDocente;
                                            user.tipo = 'docente'


                                            this.people.push(user);


                                        });
                                    });
                                });
                            });
                    }
                    else{

                        this.docService.getDocenteByMatricola(this.user.idMatricola)
                            .subscribe(data =>{
                                this.docente = data;

                                this.insegnService.getInsegnByIdDocente(this.docente.idDocente)
                                    .subscribe(data =>{
                                        this.insegnamento = data;

                                        this.studService.getAllStudByIdCdS(this.insegnamento[1].idCorsoDiStudio).subscribe(data => {
                                            this.studente = data;

                                            this.studente.forEach(student => {

                                                let user = new UserDTO();

                                                user.idMatricola = student.idMatricola;
                                                user.nome = student.nome;
                                                user.cognome = student.cognome;
                                                user.tipo = 'studente'

                                                this.people.push(user);


                                            });

                                        });
                                    });
                            });



                    }
                }
            });
    }

    openChat(person: UserDTO){

        const id = +this.route.snapshot.paramMap.get('id');
        console.log(id);
        if (this.user.tipo == 'studente') {
            this.router.navigateByUrl(`chat/${id}/${person.idMatricola}/${this.user.tipo}/${person.tipo}/0`);

        } else {
            this.router.navigateByUrl(`chat/${this.user.idDocente}/${person.idMatricola}/${this.user.tipo}/${person.tipo}/0`);

        }

        console.log(this.user.tipo);
        console.log(person.tipo);
        console.log(person.idMatricola);



    }

}


