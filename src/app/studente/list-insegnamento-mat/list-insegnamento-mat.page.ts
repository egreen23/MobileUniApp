import { Component, OnInit } from '@angular/core';
import {Insegnamento} from '../../../models/insegnamento';
import {InsegnamentoService} from '../../../services/insegnamentoService/insegnamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StudenteService} from '../../../services/studenteService/studente.service';
import {CorsoDiStudioService} from '../../../services/corsoDiStudioService/corso-di-studio.service';
import {CorsoDiStudio} from '../../../models/corsoDiStudio';

@Component({
    selector: 'app-list-insegnamento',
    templateUrl: './list-insegnamento-mat.page.html',
    styleUrls: ['./list-insegnamento-mat.page.scss'],
})
export class ListInsegnamentoMatPage implements OnInit {

    insegnamento: Insegnamento[];
    filteredInsegn = [];
    isfiltered: boolean;

    corso: CorsoDiStudio = {} as CorsoDiStudio;


    idUser = +this.route.snapshot.paramMap.get('idUser');
    idStudente = +this.route.snapshot.paramMap.get('idStudente');



    constructor(private insegnService: InsegnamentoService,
                private studService: StudenteService,
                private router: Router,
                private route: ActivatedRoute,
                private cdsService: CorsoDiStudioService
    )
    {}

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.insegnamento);
    }

    ngOnInit() {
        this.getInsegnByIdCorso();
        this.getCDSById();
    }


    getInsegnByIdCorso() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.insegnService.getByIdCorso(id)
            .subscribe(data => this.insegnamento = data)
    }

    getCDSById(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.cdsService.getCDSById(id)
            .subscribe(data => this.corso = data)
    }



    btnListMateriale(insegn) {
        console.log('INSEGNAMENTO');
        console.log(insegn.idInsegnamento);
        this.router.navigateByUrl(`/list-materiale/${insegn.idInsegnamento}/${this.idUser}/${this.idStudente}`);
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
