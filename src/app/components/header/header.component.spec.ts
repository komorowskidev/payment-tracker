import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['addAuthStateObserver', 'signOut']);
    TestBed.configureTestingModule({
      providers: [ 
        HeaderComponent,
        {provide: AuthService, useValue: spy}
      ],
    }).compileComponents();
    component = TestBed.inject(HeaderComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register as observer in AuthService on init', () => {
    component.ngOnInit()

    expect(authServiceSpy.addAuthStateObserver).toHaveBeenCalledWith(component);
  })

  it('should set logged to true to show logout button when userLogged get true', () => {
    component.logged = false;

    component.userLogged(true);

    expect(component.logged).toBe(true);
  })

  it('should set logged to false to hide logout button when userLogged get false', () => {
    component.logged = true;

    component.userLogged(false);

    expect(component.logged).toBe(false);
  })

  it('should call signOut in AuthService when logout', () => {
    component.onLogout()

    expect(authServiceSpy.signOut).toHaveBeenCalled();
  })

});
