import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public clientId: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['id'];
  }

  onHome(): void {
    this.router.navigate(['/']);
  }

}
