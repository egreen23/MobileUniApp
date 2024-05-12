import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsegnamentoMatPage } from './list-insegnamento-mat.page';

describe('ListInsegnamentoMatPage', () => {
  let component: ListInsegnamentoMatPage;
  let fixture: ComponentFixture<ListInsegnamentoMatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsegnamentoMatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsegnamentoMatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
