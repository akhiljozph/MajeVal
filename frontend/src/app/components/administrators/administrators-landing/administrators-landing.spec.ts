import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsLanding } from './administrators-landing';

describe('AdministratorsLanding', () => {
  let component: AdministratorsLanding;
  let fixture: ComponentFixture<AdministratorsLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratorsLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorsLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
