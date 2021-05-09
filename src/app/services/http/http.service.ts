import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/interfaces/auth-response-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token: string = null;

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(environment.apiUrl + '/api/auth/signin', {
      email: email,
      password: password
    });
  }

  signUp(email: string): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/api/auth/signup', {
      email: email,
    });
  }

  getClients(): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + 'api/clients', {
      headers: new HttpHeaders().set('Authorization', this.token)
    })
  }

  setToken(token: string){
    this.token = token;
  }
}
