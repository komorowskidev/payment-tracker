import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResponseType } from 'src/app/enums/response-type.enum';
import { Response } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, Response {

  @ViewChild('registerForm') registerForm: NgForm;

  isRegistering: boolean = false;
  registered: string = '';
  signUpErrorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.isRegistering = true;
    this.authService.signUp(this.registerForm.value.email, this);
    this.registerForm.reset();
    this.signUpErrorMessage = '';
  }

  onRespond(responseType: ResponseType, responseMessage: string): void {
    this.isRegistering = false;
    switch(responseType) {
      case ResponseType.SIGNUP_ERROR: {
        this.signUpErrorMessage = responseMessage;
        break;
      }
      case ResponseType.REGISTERED: {
        this.registered = responseMessage;
      }
    }
  }

}
