import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Recensione} from '../../models/recensione';
import {NavController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class RecensioneLezService {
    url: string = environment.serverUrl;

    constructor(public navCtrl: NavController, public http: HttpClient) { }



    getByMatricolaStudIdInsegIdLez(idMatricola:number, idInsegnamento, idLezione: number): Observable<Recensione> {
        return this.http.get<Recensione>(`${this.url}/recL/getByMatricolaStudIdInsegIdLez/${idMatricola}/${idInsegnamento}/${idLezione}`);
    }

    newRecLez(recensione: Recensione): Observable<Recensione> {
        return this.http.post<Recensione>(`${this.url}/recL/newRecLez`, recensione, httpOptions);
    }

    getRecLByIdLezione(IdLezione:number): Observable<Recensione[]> {
        return this.http.get<Recensione[]>(`${this.url}/recL/getRecLByIdLezione/${IdLezione}`);
    }




}
