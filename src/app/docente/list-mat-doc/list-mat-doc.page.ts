import { Component, OnInit } from '@angular/core';
import {MaterialeService} from '../../../services/materialeService/materiale.service';
import {UserDTO} from '../../../models/userDTO';
import {InsegnamentoService} from '../../../services/insegnamentoService/insegnamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Insegnamento} from '../../../models/insegnamento';
import {Materiale} from '../../../models/materiale';

@Component({
    selector: 'app-lis-mat-doc',
    templateUrl: './list-mat-doc.page.html',
    styleUrls: ['./list-mat-doc.page.scss'],
})
export class ListMatDocPage implements OnInit {


    materiale: Materiale[];
    insegnamento: Insegnamento = {} as Insegnamento;


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
        this.router.navigateByUrl(`recensione-mat-doc/${mat.idMateriale}`);
    }


}
