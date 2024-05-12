import {Component, OnInit} from '@angular/core';
import {Docente} from '../../../models/docente';
import {DocenteService} from '../../../services/docenteService/docente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/authService/auth.service';
import {UserDTO} from '../../../models/userDTO';

@Component({
    selector: 'app-home',
    templateUrl: 'home-docente.page.html',
    styleUrls: ['home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {


    docente: Docente = {} as Docente;

    // 20001112

    constructor(private docService: DocenteService,
                public authService: AuthService,
                private route: ActivatedRoute,
                private router: Router
    ) { }

    ngOnInit() {
        this.getDocenteByMAtricola();
    }

    //STAMPA I RISULATATI DELLE GET NEL HTML
    get diagnostic() {
        return JSON.stringify(this.docente);
    }


    getDocenteByMAtricola(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.docService.getDocenteByMatricola(id)
            .subscribe(data => this.docente = data);
    }

    btnLezioni() {
        //
        // this.docService.getDocenteByMatricola(this.docente.idMatricola)
        //     .subscribe(data => this.docente = data);
        //
        console.log('click btnLezione ok');
        // console.log(this.docente.idMatricola);
        //this.router.navigate(`home-docente/${this.docente.idMatricola}`);
        // this.router.navigate(['calendario-lez-doc']);
        this.router.navigateByUrl(`calendario-lez-doc/${this.docente.idDocente}`);
    }

    btnAule(){

        this.router.navigateByUrl('/list-aule');
        // this.router.navigateByUrl('menu/aule');
    }

    btnLogOut() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }

    btnChat() {
        this.router.navigateByUrl(`/chat-list/${this.docente.idMatricola}`);
    }

}
