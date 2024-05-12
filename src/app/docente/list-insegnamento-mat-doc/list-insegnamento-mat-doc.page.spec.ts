import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsegnamentoMatDocPage } from './list-insegnamento-mat-doc.page';

describe('ListInsegnamentoMatDocPage', () => {
  let component: ListInsegnamentoMatDocPage;
  let fixture: ComponentFixture<ListInsegnamentoMatDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsegnamentoMatDocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsegnamentoMatDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
