import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LezioneService} from '../../../services/lezioneService/lezione.service';
import {AulaService} from '../../../services/aulaService/aula.service';
import {Insegnamento} from '../../../models/insegnamento';
import {Lezione} from '../../../models/lezione';
import {Recensione} from '../../../models/recensione';
import {RecensioneLezService} from '../../../services/recensioneLezService/recensione-lez.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-recensione-lez',
    templateUrl: './recensione-lez.page.html',
    styleUrls: ['./recensione-lez.page.scss'],
})
export class RecensioneLezPage implements OnInit {

    lezione: Lezione = {} as Lezione;
    recensione: Recensione = {} as Recensione;
    rec: boolean = true;
    votoRG: number;
    note: string = null;

    idUser = +this.route.snapshot.paramMap.get('idUser');
    idStudente = +this.route.snapshot.paramMap.get('idStudente');


    constructor(private lezService: LezioneService,
                private recLezService: RecensioneLezService,
                private route: ActivatedRoute,
                private router: Router

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
        this.lezService.getLezioneById(id)
            .subscribe(data => {
                this.lezione = data;

                console.log("TEST_TEST ID INSEGNAMENTO")
                console.log(this.lezione.idInsegnamento);

                this.recLezService.getByMatricolaStudIdInsegIdLez(this.idUser ,this.lezione.idInsegnamento,this.lezione.idLezione)
                    .subscribe( data => {

                        if (data != null) {
                            this.recensione = data;
                            this.rec = true;
                        } else {
                            this.rec = false;
                        }

                    });
            });
    }


    onSubmit() {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var todayString: string;

        todayString =  yyyy + '/' + mm + '/' + dd;

        console.log(todayString)

        this.recensione.voto = this.votoRG;
        this.recensione.testo = this.note;
        this.recensione.idLezione = this.lezione.idLezione
        this.recensione.idStudente = this.idStudente;
        this.recensione.data = todayString;
        console.log(this.votoRG);
        console.log(this.note);
        console.log(this.lezione.idLezione);
        console.log(this.idStudente);

        // this.recMatService.newRecMat(this.recensione)
        //     .subscribe(data =>{
        //
        //         this.recensione = data;
        //
        //     });

        if (this.recensione.voto == null || this.recensione.testo == null){

            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Inserisci un voto ed una nota alla tua recensione!',
                // footer: '<a href>Why do I have this issue?</a>'
            })

        }
        else{

            Swal.fire({
                title: 'Conferma...',
                text: "Sicuro di voler procedere?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10dc60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Procedi!'
            }).then((result) => {
                if (result.value) {

                    this.recLezService.newRecLez(this.recensione)
                        .subscribe(data =>{

                            this.recensione = data;

                        });
                    this.Toast.fire({
                        type: 'success',
                        title: 'Recensione inserita con successo!',

                    });
                    this.router.navigateByUrl(`/list-lezioni/${this.lezione.idInsegnamento}/${this.idUser}/${this.idStudente}`);

                }
            })
        }
    }

    Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000

    });



}
