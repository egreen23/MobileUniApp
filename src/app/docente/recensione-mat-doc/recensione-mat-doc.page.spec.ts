import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensioneMatDocPage } from './recensione-mat-doc.page';

describe('RecensioneMatDocPage', () => {
  let component: RecensioneMatDocPage;
  let fixture: ComponentFixture<RecensioneMatDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecensioneMatDocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecensioneMatDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
