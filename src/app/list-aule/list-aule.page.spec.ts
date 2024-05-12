import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAulePage } from './list-aule.page';

describe('ListAulePage', () => {
  let component: ListAulePage;
  let fixture: ComponentFixture<ListAulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
