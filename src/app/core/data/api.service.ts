import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlBase: string = `${enviroment.urlBase}/${enviroment.path}`;

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    const url = `${this.urlBase}/${endpoint}`;
    return this.http.get<any>(url);
  }
  
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.urlBase}/${endpoint}`, data, { observe: 'response' });
  }
  
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.urlBase}/${endpoint}`, data, { observe: 'response' });
  }
  
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.urlBase}/${endpoint}`);
  }
  
  verify(endpoint: string): Observable<any> {
    return this.http.get(`${this.urlBase}/${endpoint}`);
  }
  
}
