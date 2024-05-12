import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest,HttpHandler,HttpEvent } from "@angular/common/http";
import {Observable} from 'rxjs';
import { HttpHeaders } from "@angular/common/http";

import { HttpErrorResponse } from "@angular/common/http";
import {tap} from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable()


export class Interceptor  implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    let request = req.clone({
      headers: new HttpHeaders().append('Authorization','abcd')
    });
    return  next.handle(request).pipe(tap(
      (event: any) => {},
      (error: any) => {
        if (error instanceof HttpErrorResponse)
        {
          if (error.status === 501) {

            //complex error handling over here
            console.error(error);
          }
          if (error.status === 400) {
            Swal.fire(
              'Form vuoti..',
              'Inserire Matricola e Password! ',
              'error'
            );
          }
          if (error.status === 401) {
            Swal.fire(
              'Password errata!',
              'Inserisci nuovamente la password!',
              'error'
            );
          }
          if (error.status === 500 || error.status === 0) {
            Swal.fire(
              'Attenzione!',
              'Matricola o Password errati!',
              'error'
            );
          }
        }
      }
    ));
  }
}
