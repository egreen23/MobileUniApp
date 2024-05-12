import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStudentePage } from './home-studente.page';

describe('HomeStudentePage', () => {
  let component: HomeStudentePage;
  let fixture: ComponentFixture<HomeStudentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStudentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStudentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
