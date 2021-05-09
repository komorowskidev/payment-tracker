import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy1 = jasmine.createSpyObj('HttpService', ['signIn']);
    const spy2 = jasmine.createSpyObj('Router', ['createUrlTree']);
    TestBed.configureTestingModule({
      providers: [ 
        AuthService,
        {provide: HttpService, useValue: spy1},
        {provide: Router, useValue: spy2}
      ],
    });
    service = TestBed.inject(AuthService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
