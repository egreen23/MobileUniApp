import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLezioniPage } from './list-lezioni.page';

describe('ListLezioniPage', () => {
  let component: ListLezioniPage;
  let fixture: ComponentFixture<ListLezioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLezioniPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLezioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
