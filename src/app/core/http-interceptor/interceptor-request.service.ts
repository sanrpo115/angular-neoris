import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptRequestService implements HttpInterceptor {
  
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const defaultHeaders = req.headers
      .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
      .set('authorId', enviroment.authorId)
      .set('mode', 'no-cors');
    
    const reqWithHeaders = req.clone({ headers: defaultHeaders });


    return next.handle(reqWithHeaders).pipe(
      catchError((err: HttpErrorResponse) => {
      if(err.status === 401) {
        document.write(err.error)
      }
      return throwError(err);
    }));

  }
}