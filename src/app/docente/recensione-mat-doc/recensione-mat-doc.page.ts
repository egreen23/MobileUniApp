import { Component, OnInit } from '@angular/core';
import {RecensioneLezService} from '../../../services/recensioneLezService/recensione-lez.service';
import {ActivatedRoute} from '@angular/router';
import {Recensione} from '../../../models/recensione';
import {Lezione} from '../../../models/lezione';
import {LezioneService} from '../../../services/lezioneService/lezione.service';
import {Materiale} from '../../../models/materiale';
import {RecensioneMatService} from '../../../services/recesioneMatService/recensione-mat.service';
import {MaterialeService} from '../../../services/materialeService/materiale.service';

@Component({
    selector: 'app-recensione-mat-doc',
    templateUrl: './recensione-mat-doc.page.html',
    styleUrls: ['./recensione-mat-doc.page.scss'],
})
export class RecensioneMatDocPage implements OnInit {

    materiale: Materiale = {} as Materiale;
    recensione: Recensione[];


    constructor(private matService: MaterialeService,
                private recMatService: RecensioneMatService,
                private route: ActivatedRoute
    ) {
    }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.recensione);
    }

    ngOnInit() {
        this.getMatById();
        this.getRecensione();
    }


    getMatById() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.matService.getMatById(id)
            .subscribe(data => this.materiale = data)
    }


    getRecensione() {

        const id = +this.route.snapshot.paramMap.get('id');
        this.recMatService.getRecByIdMateriale(id)
            .subscribe(data => this.recensione = data)
    }
}