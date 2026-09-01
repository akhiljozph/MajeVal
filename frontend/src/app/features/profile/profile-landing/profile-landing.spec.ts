import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLanding } from './profile-landing';

describe('ProfileLanding', () => {
  let component: ProfileLanding;
  let fixture: ComponentFixture<ProfileLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
