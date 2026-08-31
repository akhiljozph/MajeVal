import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLanding } from './users-landing';

describe('UsersLanding', () => {
  let component: UsersLanding;
  let fixture: ComponentFixture<UsersLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
