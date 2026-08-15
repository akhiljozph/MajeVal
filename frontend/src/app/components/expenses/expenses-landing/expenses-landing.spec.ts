import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLanding } from './expenses-landing';

describe('ExpensesLanding', () => {
  let component: ExpensesLanding;
  let fixture: ComponentFixture<ExpensesLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
