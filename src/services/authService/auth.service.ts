import { Injectable } from '@angular/core';
import {UserDTO} from '../../models/userDTO';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NavController} from '@ionic/angular';
import {Docente} from '../../models/docente';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public isLoggedIn = false;

    public isLoggedInDoc = false;

    public isLoggedInStud = false;



    // store the URL so we can redirect after logging in
    redirectUrl: string;

    url: string = environment.serverUrl;


    constructor(public navCtrl: NavController, public http: HttpClient) { }


    login(mat: number, psw: string): Observable<UserDTO> {
        const url = `${this.url}/user/login/${mat}/${psw}`;
        return this.http.post<UserDTO>(url, null, httpOptions).pipe(
            map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.isLoggedIn = true;
                }

                return user;
            })
        );

    }

    logout(): void {
        this.isLoggedIn = false;
        this.isLoggedInStud = false;
        this.isLoggedInDoc = false;

    }

    // getUserByMatricola(idMatricola: number): Observable<UserDTO> {
    //     return this.http.get<UserDTO>(`${this.url}/user/getById/${idMatricola}`);
    // }

    getUserByMatricola(idMatricola: number): Observable<UserDTO> {
        const url = `${this.url}/user/getById/${idMatricola}`;
        return this.http.get<UserDTO>(url).pipe(
            map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.isLoggedIn = true;
                }

                return user;
            })
        );

    }


}
