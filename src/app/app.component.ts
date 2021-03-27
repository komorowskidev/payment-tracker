import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') loginForm: NgForm;
  title = 'payment-tracker';

  onSubmit() {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
  }
}
