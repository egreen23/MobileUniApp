import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Insegnamento} from '../../models/insegnamento';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Materiale} from '../../models/materiale';

@Injectable({
  providedIn: 'root'
})
export class MaterialeService {

    url: string = environment.serverUrl;

    constructor(public navCtrl: NavController, public http: HttpClient) { }


    getMatByIdInsegnamento(idInsegnamento: number): Observable<Materiale[]> {
        return this.http.get<Materiale[]>(`${this.url}/materiale/getMatByIdInsegnamento/${idInsegnamento}`);
    }

    getMatById(idMateriale: number): Observable<Materiale> {
        return this.http.get<Materiale>(`${this.url}/materiale/getById/${idMateriale}`);
    }




}
