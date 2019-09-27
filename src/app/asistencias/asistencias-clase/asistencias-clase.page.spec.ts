import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasClasePage } from './asistencias-clase.page';

describe('AsistenciasClasePage', () => {
  let component: AsistenciasClasePage;
  let fixture: ComponentFixture<AsistenciasClasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciasClasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
