import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientComponent } from './client.component';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>

  beforeEach(async () => {
    const spy1 = jasmine.createSpyObj('Router', ['navigate']);
    const spy2 = jasmine.createSpyObj('ActivatedRoute', ['getRoute']);
    TestBed.configureTestingModule({
      providers: [ 
        ClientComponent,
        {provide: Router, useValue: spy1},
        {provide: ActivatedRoute, useValue: spy2}
      ],
    })
    .compileComponents();
    component = TestBed.inject(ClientComponent);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
