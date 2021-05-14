import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseType } from 'src/app/enums/response-type.enum';
import { AuthState } from 'src/app/interfaces/auth-state';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { Response } from 'src/app/interfaces/response';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private observers: AuthState[] = [];
  
  constructor(private httpService: HttpService, private router: Router) { }

  signIn(email: string, password: string, response: ErrorResponse): void {
    this.httpService.signIn(email, password).subscribe(
      resData => {
        this.httpService.setToken(resData.token);
        this.broadcastAuthState(true);
        this.router.navigate(['/clients']);
      },
      error => {
        let errorMessage: string;
        if(error.status == '401') {
          errorMessage = 'Email or password is incorrect.'
        } else {
          errorMessage = 'Application malfunction. Try again later.'
        }
        response.onErrorRespond(errorMessage)
      }
    )
  }

  signUp(email: string, response: Response): void {
    this.httpService.signUp(email).subscribe(
      next => {
        response.onRespond(ResponseType.REGISTERED, 'Successful. Chceck your email for instructions.')
      },
      error => {
        response.onRespond(ResponseType.SIGNUP_ERROR, 'Application malfunction. Try again later.')
      }
    )
  }

  signOut(){
    this.httpService.setToken(null);
    this.broadcastAuthState(false);
    this.router.navigate(['/auth']);
  }

  addAuthStateObserver(authState: AuthState): void {
    this.observers.push(authState);
  }

  private broadcastAuthState(logged: boolean){
    this.observers.forEach(observer => {
      observer.userLogged(logged);
    });
  }
  
}
