import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthLanding } from './auth-landing';

describe('AuthLanding', () => {
  let component: AuthLanding;
  let fixture: ComponentFixture<AuthLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLanding],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
