import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Aula} from '../../models/aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

    url: string = environment.serverUrl;

    constructor(public navCtrl: NavController, public http: HttpClient) { }



    // getById(idAula: number): Observable<Aula> {
    //     let seq = this.http.get<Aula>(`${this.url}/aula/getById/${idAula}`);
    //
    //     seq = seq
    //         .map(res => {if(res.status === 200){
    //             return res.json();
    //         }else {
    //             throw new Error('This request has failed ' + res.status);
    //         }
    //         })
    //
    //     return seq;
    // }

    getByName(nomeAula: string): Observable<Aula> {
        return this.http.get<Aula>(`${this.url}/aula/getByNomeAula/${nomeAula}`);
    }

    findAll(): Observable<Aula[]> {
        return this.http.get<Aula[]>(`${this.url}/aula/findAll`);
    }

    getById(idAula: number): Observable<Aula> {
        return this.http.get<Aula>(`${this.url}/aula/getById/${idAula}`);
    }

    //LISTA DI AULE

    // getByName(nomeAula: string): Observable<Aula[]> {
    //     return this.http.get<Aula[]>(`${this.url}/aula/getByName/${nomeAula}`);
    // }
}



