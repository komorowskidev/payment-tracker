import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/interfaces/auth-state';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, AuthState {

  private logged: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.addAuthStateObserver(this);
  }

  userLogged(logged: boolean): void {
    this.logged = logged;
  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.logged ? true : this.router.createUrlTree(['/auth']);
  }
}
