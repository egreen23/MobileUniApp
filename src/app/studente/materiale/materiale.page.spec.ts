import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialePage } from './materiale.page';

describe('MaterialePage', () => {
  let component: MaterialePage;
  let fixture: ComponentFixture<MaterialePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
