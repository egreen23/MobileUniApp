import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaterialePage } from './list-materiale.page';

describe('ListMaterialePage', () => {
  let component: ListMaterialePage;
  let fixture: ComponentFixture<ListMaterialePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMaterialePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaterialePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
