import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensioneLezDocPage } from './recensione-lez-doc.page';

describe('RecensioneLezDocPage', () => {
  let component: RecensioneLezDocPage;
  let fixture: ComponentFixture<RecensioneLezDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecensioneLezDocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecensioneLezDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
