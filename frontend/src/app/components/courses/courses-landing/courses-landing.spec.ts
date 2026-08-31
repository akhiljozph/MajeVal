import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesLanding } from './courses-landing';

describe('CoursesLanding', () => {
  let component: CoursesLanding;
  let fixture: ComponentFixture<CoursesLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
