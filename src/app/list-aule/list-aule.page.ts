import { Component, OnInit } from '@angular/core';
import {Aula} from '../../models/aula';
import {AulaService} from '../../services/aulaService/aula.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-aule',
  templateUrl: './list-aule.page.html',
  styleUrls: ['./list-aule.page.scss'],
})
export class ListAulePage implements OnInit {

    aula: Aula[];
    filteredAula = [];
    isfiltered: boolean;

    constructor(private aulaService: AulaService,
                private router: Router
    ) { }

    ngOnInit() {
        this.getAllAule();
    }

    //STAMPA I RISULATATI DELLE GET IN HTML
    get diagnostic() {
        return JSON.stringify(this.aula);
    }


    searchMaps(event) {
        // if (event.target.value.length > 1) {
        const filteredJson = this.aula.filter((row) => {
            if (row.nome.indexOf(event.target.value) !== -1) {
                return true;
            } else {
                return false;
            }
        });
        this.isfiltered = true;
        this.filteredAula = filteredJson;
        // }
    }

    getAulaDettagli(aula) {
        console.log('CLICK AULA DETTAGLI');
        console.log(aula.idAula);
        this.router.navigateByUrl(`/aula-detail-map/${aula.idAula}`);
    }

    showAuleMapp() {
        this.router.navigateByUrl('/all-aule-map');
    }

    getAllAule() {
        this.aulaService.findAll()
            .subscribe(data => this.aula = data);
    }


}
