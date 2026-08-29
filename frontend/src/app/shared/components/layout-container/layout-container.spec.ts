import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutContainer } from './layout-container';

describe('LayoutContainer', () => {
  let component: LayoutContainer;
  let fixture: ComponentFixture<LayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
