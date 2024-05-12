import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsegnamentoLezDocPage } from './list-insegnamento-lez-doc.page';

describe('ListInsegnamentoLezDocPage', () => {
  let component: ListInsegnamentoLezDocPage;
  let fixture: ComponentFixture<ListInsegnamentoLezDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsegnamentoLezDocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsegnamentoLezDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
