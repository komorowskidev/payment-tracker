import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const email: string = 'example email';
  const password: string = 'example password';
  let resetHaveBeenCalled: boolean;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signIn']);
    TestBed.configureTestingModule({
      providers: [ 
        LoginComponent,
        {provide: AuthService, useValue: spy}
      ],
    }).compileComponents();
    component = TestBed.inject(LoginComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    resetHaveBeenCalled = false;
    component.authForm = { 
      reset: () => {resetHaveBeenCalled = true},
      value: {
        email: email,
        password: password
    }} as NgForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change state to show loading-spinner when submit', () => {
    component.isLogging = false;
    
    component.onSubmit();
    
    expect(component.isLogging).toBe(true);
  });

  it('should send data to AuthService when submit', () => {
    component.onSubmit();

    expect(authServiceSpy.signIn).toHaveBeenCalledWith(email, password, component)
  })

  it('should reset form when submit', () => {
    component.onSubmit();

    expect(resetHaveBeenCalled).toBe(true)
  })

  it('should reset error message when submit', () => {
    component.signInErrorMessage = 'not empty';

    component.onSubmit();

    expect(component.signInErrorMessage).toBe('');
  })

  it('should change loggin state to false when errorRespond', () => {
    component.isLogging = true;

    component.onErrorRespond('error message');

    expect(component.isLogging).toBe(false);
  })

  it('should set error message when errorRespond', () => {
    const errorMessage = 'error message';
    component.signInErrorMessage = '';

    component.onErrorRespond(errorMessage);

    expect(component.signInErrorMessage).toBe(errorMessage);
  })
});
