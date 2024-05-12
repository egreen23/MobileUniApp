import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Aula} from '../../models/aula';
import {Insegnamento} from '../../models/insegnamento';

@Injectable({
  providedIn: 'root'
})
export class InsegnamentoService {

    url: string = environment.serverUrl;

    constructor(public navCtrl: NavController, public http: HttpClient) { }


    getByIdCorso(idCorso: number): Observable<Insegnamento[]> {
        return this.http.get<Insegnamento[]>(`${this.url}/insegnamento/getByIdCorso/${idCorso}`);
    }

    getInsegnById(idInsegnamento: number): Observable<Insegnamento> {
        return this.http.get<Insegnamento>(`${this.url}/insegnamento/getById/${idInsegnamento}`);
    }

    getInsegnByIdDocente(idDocente: number): Observable<Insegnamento[]> {
        return this.http.get<Insegnamento[]>(`${this.url}/insegnamento/getByIdDocente/${idDocente}`);
    }


}
