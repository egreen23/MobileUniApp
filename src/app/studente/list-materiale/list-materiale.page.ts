import { Component, OnInit } from '@angular/core';
import {StudenteService} from '../../../services/studenteService/studente.service';
import {InsegnamentoService} from '../../../services/insegnamentoService/insegnamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events} from '@ionic/angular';
import {MaterialeService} from '../../../services/materialeService/materiale.service';
import {Materiale} from '../../../models/materiale';
import {Studente} from '../../../models/studente';
import {Insegnamento} from '../../../models/insegnamento';
import {UserDTO} from '../../../models/userDTO';

@Component({
    selector: 'app-list-materiale',
    templateUrl: './list-materiale.page.html',
    styleUrls: ['./list-materiale.page.scss'],
})
export class ListMaterialePage implements OnInit {


    materiale: Materiale[];
    insegnamento: Insegnamento = {} as Insegnamento;
    user: UserDTO = {} as UserDTO;

    idUser = +this.route.snapshot.paramMap.get('idUser');
    idStudente = +this.route.snapshot.paramMap.get('idStudente');



    constructor(private matService: MaterialeService,
                private insegnService: InsegnamentoService,
                private router: Router,
                private route: ActivatedRoute)
    { }

    ngOnInit() {
        this.getMatByIdInsegnamento();
        this.getInsegnamentoById();
    }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.materiale);
    }

    getMatByIdInsegnamento() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.matService.getMatByIdInsegnamento(id)
            .subscribe(data => this.materiale = data)
    }

    getInsegnamentoById() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.insegnService.getInsegnById(id)
            .subscribe(data => this.insegnamento = data)
    }


    btnMateriale(mat) {
        console.log('BTN_MATERIALE');
        console.log(mat.idMateriale);
        this.router.navigateByUrl(`materiale/${mat.idMateriale}/${this.idUser}/${this.idStudente}`);
    }


}
