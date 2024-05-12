import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Materiale} from '../../models/materiale';
import {environment} from '../../environments/environment';
import {NavController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Recensione} from '../../models/recensione';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RecensioneMatService {

    url: string = environment.serverUrl;

    constructor(public navCtrl: NavController, public http: HttpClient) { }



    getRecMatByMatStudIdInsegnIdMat(idMatricola:number, idInsegnamento, idMateriale: number): Observable<Recensione> {
        return this.http.get<Recensione>(`${this.url}/recM/getByMatricolaStudIdInsegIdMaterial/${idMatricola}/${idInsegnamento}/${idMateriale}`);
    }

    newRecMat(recensione: Recensione): Observable<Recensione> {
        return this.http.post<Recensione>(`${this.url}/recM/newRecMat`, recensione, httpOptions);
    }

    getRecByIdMateriale(idMateriale: number): Observable<Recensione[]> {
        return this.http.get<Recensione[]>(`${this.url}/recM/getRecByIdMateriale/${idMateriale}`);
    }



}
