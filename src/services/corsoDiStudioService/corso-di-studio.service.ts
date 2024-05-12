import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Insegnamento} from '../../models/insegnamento';
import {Observable} from 'rxjs';
import {CorsoDiStudio} from '../../models/corsoDiStudio';

@Injectable({
  providedIn: 'root'
})
export class CorsoDiStudioService {

    url: string = environment.serverUrl;

    constructor(public navCtrl: NavController, public http: HttpClient) {}

    getCDSById(idCorso: number): Observable<CorsoDiStudio> {
        return this.http.get<CorsoDiStudio>(`${this.url}/corso/getById/${idCorso}`);
    }

}



