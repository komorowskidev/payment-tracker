import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ResponseType } from 'src/app/enums/response-type.enum';
import { AuthResponseData } from 'src/app/interfaces/auth-response-data';
import { AuthState } from 'src/app/interfaces/auth-state';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { Response } from 'src/app/interfaces/response';
import { HttpService } from '../http/http.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy1 = jasmine.createSpyObj('HttpService', ['signIn', 'signUp', 'signOut', 'setToken']);
    const spy2 = jasmine.createSpyObj('Router', ['navigate']);
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

  describe('method signIn', () => {
    const email = 'some email';
    const password = 'some password';
    const token = 'some token';
    let resData: AuthResponseData = { token: token, type: 'type', id: 1, email: email, roleSet: ['role'] };

    it('should call signIn in HttpService', () => {
      httpServiceSpy.signIn.withArgs(email, password).and.returnValue(of(resData));
  
      service.signIn(email, password, null);
  
      expect(httpServiceSpy.signIn).toHaveBeenCalledWith(email, password);
    })
  
    it('should setToken in httpService when success', () => {
      httpServiceSpy.signIn.withArgs(email, password).and.returnValue(of(resData));
  
      service.signIn(email, password, null);
  
      expect(httpServiceSpy.setToken).toHaveBeenCalledWith(token);
    })

    it('should broadcast authentication success when success', () => {
      httpServiceSpy.signIn.withArgs(email, password).and.returnValue(of(resData));
      const observer1Spy = jasmine.createSpyObj('AuthState', ['userLogged']) as AuthState;
      const observer2Spy = jasmine.createSpyObj('AuthState', ['userLogged']) as AuthState;
      service.addAuthStateObserver(observer1Spy);
      service.addAuthStateObserver(observer2Spy);
  
      service.signIn(email, password, null);
  
      expect(observer1Spy.userLogged).toHaveBeenCalledWith(true);
      expect(observer2Spy.userLogged).toHaveBeenCalledWith(true);
    })

    it('should route to clients when success', () => {
      httpServiceSpy.signIn.withArgs(email, password).and.returnValue(of(resData));
      const parameter = ['/clients'];

      service.signIn(email, password, null);

      expect(routerSpy.navigate).toHaveBeenCalledWith(parameter);
    })

    it('should respond auth error message when error is 401', () => {
      const error = {status: '401'};
      httpServiceSpy.signIn.withArgs(email, password).and.returnValue(throwError(error));
      const errorResponseSpy = jasmine.createSpyObj('ErrorResponse', ['onErrorRespond']) as ErrorResponse;
      const errorMessage = 'Email or password is incorrect.';

      service.signIn(email, password, errorResponseSpy);

      expect(errorResponseSpy.onErrorRespond).toHaveBeenCalledWith(errorMessage);
    })

    it('should respond general error message when error is not 401', () => {
      const error = {status: '400'};
      httpServiceSpy.signIn.withArgs(email, password).and.returnValue(throwError(error));
      const errorResponseSpy = jasmine.createSpyObj('ErrorResponse', ['onErrorRespond']) as ErrorResponse;
      const errorMessage = 'Application malfunction. Try again later.';

      service.signIn(email, password, errorResponseSpy);

      expect(errorResponseSpy.onErrorRespond).toHaveBeenCalledWith(errorMessage);
    })
  })

  describe('method signUp', () => {
    const email = 'some email';
    const token = 'some token';
    let resData: AuthResponseData = { token: token, type: 'type', id: 1, email: email, roleSet: ['role'] };

    it('should call signUp in HttpService', () => {
      httpServiceSpy.signUp.withArgs(email).and.returnValue(of());
  
      service.signUp(email, null);
  
      expect(httpServiceSpy.signUp).toHaveBeenCalledWith(email);
    })

    it('should respond REGISTERED message when success', () => {
      httpServiceSpy.signUp.withArgs(email).and.returnValue(of(true));
      const responseSpy = jasmine.createSpyObj('Response', ['onRespond']) as Response;
      const message = 'Successful. Chceck your email for instructions.';
  
      service.signUp(email, responseSpy);
  
      expect(responseSpy.onRespond).toHaveBeenCalledWith(ResponseType.REGISTERED, message)
    })

    it('should respond SIGNUP_ERROR message when error', () => {
      httpServiceSpy.signUp.withArgs(email).and.returnValue(throwError('error'))
      const responseSpy = jasmine.createSpyObj('Response', ['onRespond']) as Response;
      const errorMessage = 'Application malfunction. Try again later.';
  
      service.signUp(email, responseSpy);
  
      expect(responseSpy.onRespond).toHaveBeenCalledWith(ResponseType.SIGNUP_ERROR, errorMessage)
    })
  })

  describe('method signOut', () => {
    it('should remove token in HttpService', () => {
      service.signOut();
  
      expect(httpServiceSpy.setToken).toHaveBeenCalledWith(null);
    })


    it('should broadcast logout state', () => {
      const observer1Spy = jasmine.createSpyObj('AuthState', ['userLogged']) as AuthState;
      const observer2Spy = jasmine.createSpyObj('AuthState', ['userLogged']) as AuthState;
      service.addAuthStateObserver(observer1Spy);
      service.addAuthStateObserver(observer2Spy);
  
      service.signOut();
  
      expect(observer1Spy.userLogged).toHaveBeenCalledWith(false);
      expect(observer2Spy.userLogged).toHaveBeenCalledWith(false);
    })

    it('should route to auth', () => {
      const parameter = ['/auth'];

      service.signOut();

      expect(routerSpy.navigate).toHaveBeenCalledWith(parameter);
    })
  })

  describe('method addAuthStateObserver', () => {
    it('should add observers to array', () => {
      const observer1Spy = jasmine.createSpyObj('AuthState', ['userLogged']) as AuthState;
      const observer2Spy = jasmine.createSpyObj('AuthState', ['userLogged']) as AuthState;
      const observer3Spy = jasmine.createSpyObj('AuthState', ['userLogged']) as AuthState;

      service.addAuthStateObserver(observer1Spy);
      service.addAuthStateObserver(observer2Spy);
      service.addAuthStateObserver(observer3Spy);
  
      service.signOut();
      expect(observer1Spy.userLogged).toHaveBeenCalledWith(false);
      expect(observer2Spy.userLogged).toHaveBeenCalledWith(false);
      expect(observer3Spy.userLogged).toHaveBeenCalledWith(false);
    })
  })
  
});
