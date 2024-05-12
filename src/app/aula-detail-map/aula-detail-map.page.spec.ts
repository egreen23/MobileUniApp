import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaDetailMapPage } from './aula-detail-map.page';

describe('AulaDetailMapPage', () => {
  let component: AulaDetailMapPage;
  let fixture: ComponentFixture<AulaDetailMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaDetailMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaDetailMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
