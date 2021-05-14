import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy1 = jasmine.createSpyObj('AuthService', ['addAuthStateObserver']);
    const spy2 = jasmine.createSpyObj('Router', ['createUrlTree']);
    TestBed.configureTestingModule({
      providers: [ 
        AuthGuardService,
        {provide: AuthService, useValue: spy1},
        {provide: Router, useValue: spy2}
      ],
    });
    service = TestBed.inject(AuthGuardService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register as observer in AuthService', () => {
    expect(authServiceSpy.addAuthStateObserver).toHaveBeenCalledWith(service);
  })

  it('canActivated should return true when logged', () => {
    service.userLogged(true);

    const actual = service.canActivate(null, null);

    expect(actual).toBeTrue();
  })

  it('canActivated should return urlTree to auth when not logged', () => {
    service.userLogged(false);
    const urlTree = {} as UrlTree;
    routerSpy.createUrlTree.withArgs(['/auth']).and.returnValue(urlTree);

    const actual = service.canActivate(null, null);

    expect(actual).toBe(urlTree);
  })
});
