import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {NavController} from '@ionic/angular';
import {Docente} from '../../models/docente';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Studente} from '../../models/studente';

@Injectable({
  providedIn: 'root'
})
export class StudenteService {

    url: string = environment.serverUrl;


    constructor(public navCtrl: NavController, public http: HttpClient) {
    }


    getAllStudenti(): Observable<Studente[]> {
        return this.http.get<Studente[]>(`${this.url}/stud/findAll`);
    }


    getStudenteByMatricola(idMatricola: number): Observable<Studente> {
        return this.http.get<Studente>(`${this.url}/stud/getByMatricola/${idMatricola}`);
    }

    getAllStudByIdCdS(idCdS: number): Observable<Studente[]> {
        return this.http.get<Studente[]>(`${this.url}/stud/getAllStudByIdCdS/${idCdS}`);
    }



}
