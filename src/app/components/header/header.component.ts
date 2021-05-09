import { Component, OnInit } from '@angular/core';
import { AuthState } from 'src/app/interfaces/auth-state';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AuthState {

  logged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.addAuthStateObserver(this);
  }

  userLogged(logged: boolean): void {
    this.logged = logged;
  }

  onLogout(): void {
    this.authService.signOut();
  }

}
