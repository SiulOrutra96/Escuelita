import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRasgosComponent } from './lista-rasgos.component';

describe('ListaRasgosComponent', () => {
  let component: ListaRasgosComponent;
  let fixture: ComponentFixture<ListaRasgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRasgosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRasgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
