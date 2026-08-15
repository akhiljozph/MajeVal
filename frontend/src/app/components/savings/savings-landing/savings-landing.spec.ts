import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsLanding } from './savings-landing';

describe('SavingsLanding', () => {
  let component: SavingsLanding;
  let fixture: ComponentFixture<SavingsLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingsLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(SavingsLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
