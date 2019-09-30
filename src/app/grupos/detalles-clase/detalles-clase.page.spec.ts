import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesClasePage } from './detalles-clase.page';

describe('DetallesClasePage', () => {
  let component: DetallesClasePage;
  let fixture: ComponentFixture<DetallesClasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesClasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
