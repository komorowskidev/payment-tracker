import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onHome(): void {
    this.router.navigate(['/']);
  }

}
