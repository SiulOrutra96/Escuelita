import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenAsistenciasPage } from './resumen-asistencias.page';

describe('ResumenAsistenciasPage', () => {
  let component: ResumenAsistenciasPage;
  let fixture: ComponentFixture<ResumenAsistenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenAsistenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
