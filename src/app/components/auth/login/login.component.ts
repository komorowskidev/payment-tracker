import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ErrorResponse {

  @ViewChild('authForm') authForm: NgForm;

  isLogging: boolean = false;

  signInErrorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLogging = true;
    this.authService.signIn(this.authForm.value.email, this.authForm.value.password, this);
    this.authForm.reset();
    this.signInErrorMessage = '';
  }

  onErrorRespond(responseMessage: string): void {
    this.isLogging = false;
    this.signInErrorMessage = responseMessage;
  }

}
