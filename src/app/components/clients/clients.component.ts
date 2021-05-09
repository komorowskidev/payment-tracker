import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public newClient = "/new-client";

  public client = "/client";

  constructor() { }

  ngOnInit(): void {
  }

}
