import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticoPage } from './estadistico.page';

describe('EstadisticoPage', () => {
  let component: EstadisticoPage;
  let fixture: ComponentFixture<EstadisticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
