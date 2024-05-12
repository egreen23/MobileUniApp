import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LezioneCal} from '../../models/lezioneCal';
import {Lezione} from '../../models/lezione';

@Injectable({
  providedIn: 'root'
})
export class LezioneService {

    url: string = environment.serverUrl;

    constructor(public navCtrl: NavController, public http: HttpClient) { }


    getLezioniByIdDocente(idDocente: number): Observable<LezioneCal[]> {
        return this.http.get<LezioneCal[]>(`${this.url}/lez/getLezioniByIdDocente/${idDocente}`);
    }

    getLezioneById(idLezione: number): Observable<Lezione> {
        return this.http.get<Lezione>(`${this.url}/lez/getLezioneById/${idLezione}`);
    }

    getLezioniByCorso(nomeCorso: string): Observable<LezioneCal[]> {
        return this.http.get<LezioneCal[]>(`${this.url}/lez/getCalLezioniByCorso/${nomeCorso}`);
    }

    getLezioneByIdInsegnamento(idInsegnamento: number): Observable<Lezione[]> {
        return this.http.get<Lezione[]>(`${this.url}/lez/getLezioniByIdInsegnamento/${idInsegnamento}`);
    }



}
