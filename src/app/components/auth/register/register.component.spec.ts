import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { ResponseType } from 'src/app/enums/response-type.enum';
import { AuthService } from 'src/app/services/auth/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const email: string = 'example email';
  let resetHaveBeenCalled: boolean;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['signUp']);
    TestBed.configureTestingModule({
      providers: [ 
        RegisterComponent,
        {provide: AuthService, useValue: spy}
      ],
    }).compileComponents();
    component = TestBed.inject(RegisterComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    resetHaveBeenCalled = false;
    component.registerForm = { 
      reset: () => {resetHaveBeenCalled = true},
      value: {
        email: email
    }} as NgForm;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change state to show loading-spinner when register', () => {
    component.isRegistering = false;
    
    component.onRegister();
    
    expect(component.isRegistering).toBe(true);
  });

  it('should send data to AuthService when register', () => {
    component.onRegister();

    expect(authServiceSpy.signUp).toHaveBeenCalledWith(email, component)
  })

  it('should reset form when register', () => {
    component.onRegister();

    expect(resetHaveBeenCalled).toBe(true)
  })

  it('should reset error message when register', () => {
    component.signUpErrorMessage = 'not empty';

    component.onRegister();

    expect(component.signUpErrorMessage).toBe('');
  })

  it('should change registering state to false when respond', () => {
    component.isRegistering = true;

    component.onRespond(ResponseType.SIGNUP_ERROR, 'error message');

    expect(component.isRegistering).toBe(false);
  })

  it('should set error message when error respond', () => {
    const expectedErrorMessage = 'error message';
    const shouldNotChange = 'this should not change';
    component.registered = shouldNotChange;
    component.signUpErrorMessage = '';

    component.onRespond(ResponseType.SIGNUP_ERROR, expectedErrorMessage);

    expect(component.signUpErrorMessage).toBe(expectedErrorMessage);
    expect(component.registered).toBe(shouldNotChange);
  })

  it('should set registered message when success respond', () => {
    const shouldNotChange = 'this should not change';
    const expectedRegisteredMessage = 'success';
    component.registered = '';
    component.signUpErrorMessage = shouldNotChange;

    component.onRespond(ResponseType.REGISTERED, expectedRegisteredMessage);

    expect(component.signUpErrorMessage).toBe(shouldNotChange);
    expect(component.registered).toBe(expectedRegisteredMessage);
  })
});
