import { Component, OnInit } from '@angular/core';
import {InsegnamentoService} from '../../../services/insegnamentoService/insegnamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Insegnamento} from '../../../models/insegnamento';
import {CorsoDiStudio} from '../../../models/corsoDiStudio';

@Component({
    selector: 'app-lis-insegnamento-mat-doc',
    templateUrl: './list-insegnamento-mat-doc.page.html',
    styleUrls: ['./list-insegnamento-mat-doc.page.scss'],
})
export class ListInsegnamentoMatDocPage implements OnInit {

    insegnamento: Insegnamento[];
    filteredInsegn = [];
    isfiltered: boolean;

    corso: CorsoDiStudio = {} as CorsoDiStudio;


    // idUser = +this.route.snapshot.paramMap.get('idUser');
    // idStudente = +this.route.snapshot.paramMap.get('idStudente');



    constructor(private insegnService: InsegnamentoService,
                // private studService: StudenteService,
                private router: Router,
                private route: ActivatedRoute,
                // private cdsService: CorsoDiStudioService
    )
    {}

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.insegnamento);
    }

    ngOnInit() {
        this.getInsegnByDocente();
    }


    getInsegnByDocente() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.insegnService.getInsegnByIdDocente(id)
            .subscribe(data => this.insegnamento = data)
    }




    btnListMateriale(insegn) {
        console.log('INSEGNAMENTO');
        console.log(insegn.idInsegnamento);
        this.router.navigateByUrl(`/list-mat-doc/${insegn.idInsegnamento}`);
    }


    searchIns(event) {
        // if (event.target.value.length > 2) {
        const filteredJson = this.insegnamento.filter((row) => {
            if (row.nome.indexOf(event.target.value) !== -1) {
                return true;
            } else {
                return false;
            }
        });
        this.isfiltered = true;
        this.filteredInsegn = filteredJson;
        // }
    }







}
