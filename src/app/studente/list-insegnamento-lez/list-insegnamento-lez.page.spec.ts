import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsegnamentoLezPage } from './list-insegnamento-lez.page';

describe('ListInsegnamentoLezPage', () => {
  let component: ListInsegnamentoLezPage;
  let fixture: ComponentFixture<ListInsegnamentoLezPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsegnamentoLezPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsegnamentoLezPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
