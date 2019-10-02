import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarRasgosComponent } from './calificar-rasgos.component';

describe('CalificarRasgosComponent', () => {
  let component: CalificarRasgosComponent;
  let fixture: ComponentFixture<CalificarRasgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificarRasgosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificarRasgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
