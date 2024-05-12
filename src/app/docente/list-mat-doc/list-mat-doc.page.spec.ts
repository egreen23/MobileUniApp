import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatDocPage } from './list-mat-doc.page';

describe('ListMatDocPage', () => {
  let component: ListMatDocPage;
  let fixture: ComponentFixture<ListMatDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMatDocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMatDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
