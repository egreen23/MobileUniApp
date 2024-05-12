import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../../models/docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

    url: string = environment.serverUrl;


    constructor(public navCtrl: NavController, public http: HttpClient) { }


    getAllDocenti(): Observable<Docente[]> {
        return this.http.get<Docente[]>(`${this.url}/doc/findAll`);
    }


    getDocenteByMatricola(idMatricola: number): Observable<Docente> {
        return this.http.get<Docente>(`${this.url}/doc/getByMatricola/${idMatricola}`);
    }

    getDocenteById(idDocente: number): Observable<Docente> {
        return this.http.get<Docente>(`${this.url}/doc/getById/${idDocente}`);
    }






}
