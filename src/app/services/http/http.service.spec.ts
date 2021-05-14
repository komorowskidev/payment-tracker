import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthResponseData } from 'src/app/interfaces/auth-response-data';
import { environment } from 'src/environments/environment';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [ 
        HttpService,
        {provide: HttpClient, useValue: spy}
      ],
    });
    service = TestBed.inject(HttpService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method signIn', () => {
    const email = 'some email';
    const password = 'some password';
    const token = 'some token';
    const resData: AuthResponseData = { token: token, type: 'type', id: 1, email: email, roleSet: ['role'] };
    const observable: Observable<AuthResponseData> = of(resData) ;

    it('should call post in HttpClient', () => {
      httpClientSpy.post.withArgs(environment.apiUrl + '/api/auth/signin', {email: email, password: password}).and.returnValue(observable);
  
      const actual = service.signIn(email, password);
  
      expect(actual).toBe(observable);
    })
  })

  describe('method signUp', () => {
    const email = 'some email';
    const token = 'some token';
    const observable: Observable<boolean> = of(true) ;

    it('should call post in HttpClient', () => {
      httpClientSpy.post.withArgs(environment.apiUrl + '/api/auth/signup', {email: email}).and.returnValue(observable);
  
      const actual = service.signUp(email);
  
      expect(actual).toBe(observable);
    })
  })

  describe('method signUp', () => {
    const email = 'some email';
    const observable: Observable<boolean> = of(true) ;

    it('should call post in HttpClient', () => {
      httpClientSpy.post.withArgs(environment.apiUrl + '/api/auth/signup', {email: email}).and.returnValue(observable);
  
      const actual = service.signUp(email);
  
      expect(actual).toBe(observable);
    })
  })
});
