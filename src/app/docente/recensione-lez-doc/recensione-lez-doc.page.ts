import { Component, OnInit } from '@angular/core';
import {RecensioneLezService} from '../../../services/recensioneLezService/recensione-lez.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recensione} from '../../../models/recensione';
import {Lezione} from '../../../models/lezione';
import {LezioneService} from '../../../services/lezioneService/lezione.service';

@Component({
    selector: 'app-recensione-lez-doc',
    templateUrl: './recensione-lez-doc.page.html',
    styleUrls: ['./recensione-lez-doc.page.scss'],
})
export class RecensioneLezDocPage implements OnInit {

    lezione: Lezione = {} as Lezione;
    recensione: Recensione[];


    constructor(private lezService: LezioneService,
                private recLezService: RecensioneLezService,
                private route: ActivatedRoute
    ) { }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.lezione);
    }

    ngOnInit() {
        this.getLezById();
        this.getRecensione();
    }


    getLezById() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.lezService.getLezioneById(id)
            .subscribe(data => this.lezione = data)
    }




    getRecensione() {

        const id = +this.route.snapshot.paramMap.get('id');
        this.recLezService.getRecLByIdLezione(id)
            .subscribe(data => this.recensione = data)
    }

}
