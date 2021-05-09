import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NewClientComponent } from './new-client.component';

describe('NewClientComponent', () => {
  let component: NewClientComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [ 
        NewClientComponent,
        {provide: Router, useValue: spy}
      ],
    })
    .compileComponents();
    component = TestBed.inject(NewClientComponent);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
