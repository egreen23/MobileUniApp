import { Component, OnInit } from '@angular/core';
import {InsegnamentoService} from '../../../services/insegnamentoService/insegnamento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LezioneService} from '../../../services/lezioneService/lezione.service';
import {Insegnamento} from '../../../models/insegnamento';
import {Lezione} from '../../../models/lezione';

@Component({
    selector: 'app-list-lezioni',
    templateUrl: './list-lezioni.page.html',
    styleUrls: ['./list-lezioni.page.scss'],
})
export class ListLezioniPage implements OnInit {

    l = [];
    lezione: Lezione[];
    insegnamento: Insegnamento = {} as Insegnamento;

    idUser = +this.route.snapshot.paramMap.get('idUser');
    idStudente = +this.route.snapshot.paramMap.get('idStudente');

    constructor(private lezService: LezioneService,
                private insegnService: InsegnamentoService,
                private router: Router,
                private route: ActivatedRoute,
    ) { }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.lezione);
    }


    ngOnInit() {
        this.getLezioneByIdInsegnamento();
        this.getInsegnamentoById();
    }


    getLezioneByIdInsegnamento() {
        const id = +this.route.snapshot.paramMap.get('id');
        console.log(id  +"PPPPPPPP");
        this.lezService.getLezioneByIdInsegnamento(id)
            .subscribe( data => {

                this.lezione = data;

                if (this.lezione != null){
                    for (let i = 0; i < this.lezione.length; i++) {


                        var today = new Date();
                        var dataLez = new  Date(this.lezione[i].data);

                        if(dataLez < today)
                        {
                            this.l.push(this.lezione[i]);
                            console.log(this.l);
                        }
                    }}

            });
    }

    getInsegnamentoById() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.insegnService.getInsegnById(id)
            .subscribe(data => this.insegnamento = data)
    }

    btnLezione(lez) {
        console.log('BTN_LEZIONE');
        this.router.navigateByUrl(`recensione-lez/${lez.idLezione}/${this.idUser}/${this.idStudente}`);

    }

}
