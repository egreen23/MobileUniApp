import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/authService/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Studente} from '../../../models/studente';
import {StudenteService} from '../../../services/studenteService/studente.service';
import {Events} from '@ionic/angular';
import {UserDTO} from '../../../models/userDTO';

@Component({
    selector: 'app-home-studente',
    templateUrl: './home-studente.page.html',
    styleUrls: ['./home-studente.page.scss'],
})
export class HomeStudentePage implements OnInit {

    studente: Studente = {} as Studente;
    user: UserDTO = {} as UserDTO;

    idUser = +this.route.snapshot.paramMap.get('idUser');


    // 20001112

    constructor(private studService: StudenteService,
                public authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private event: Events,

    ) {
        // event.subscribe('parsing:data', (user) => {
        //     this.user = user
        //
        //     this.authService.getUserByMatricola(this.user.idMatricola)
        //         .subscribe( data => {
        //             this.user = data;
        //
        //     console.log(this.user.tipo);
        //
        // });
        //
        // });
    }

    ngOnInit() {
        this.getStudenteByMAtricola();
    }

    //STAMPA I RISULATATI DELLE GET NEL HTML
    get diagnostic() {
        return JSON.stringify(this.studente);
    }


    getStudenteByMAtricola(){
        // const id = +this.route.snapshot.paramMap.get('id');
        this.studService.getStudenteByMatricola(this.idUser)
            .subscribe(data =>{
                this.studente = data

                this.event.publish('parsing:data', this.studente);

            });
    }

    btnLezioni() {
        //
        // this.studService.getDocenteByMatricola(this.docente.idMatricola)
        //     .subscribe(data => this.docente = data);
        //
        console.log('click btnLezione ok');
        // console.log(this.studente.idMatricola);
        //this.router.navigate(`home-docente/${this.docente.idMatricola}`);
        // this.router.navigate(['calendario-lez-doc']);
        this.router.navigateByUrl(`calendario-lez-stud/${this.studente.idMatricola}`);
    }

    btnAule(){

        this.router.navigateByUrl('/list-aule');
        // this.router.navigateByUrl('menu/aule');
    }

    btnMatDidattico() {
        this.router.navigateByUrl(`list-insegnamento-mat/${this.studente.idCorsoDiStudio}/${this.idUser}/${this.studente.idStudente}`);
    }

    btnChat() {
        this.router.navigateByUrl(`/chat-list/${this.studente.idMatricola}`);

    }

}
