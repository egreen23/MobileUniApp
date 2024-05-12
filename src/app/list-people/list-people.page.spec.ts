import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPeoplePage } from './list-people.page';

describe('ListPeoplePage', () => {
  let component: ListPeoplePage;
  let fixture: ComponentFixture<ListPeoplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPeoplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPeoplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
