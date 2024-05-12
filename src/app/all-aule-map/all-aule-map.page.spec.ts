import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAuleMapPage } from './all-aule-map.page';

describe('AllAuleMapPage', () => {
  let component: AllAuleMapPage;
  let fixture: ComponentFixture<AllAuleMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAuleMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAuleMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
