import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseListaPage } from './pase-lista.page';

describe('PaseListaPage', () => {
  let component: PaseListaPage;
  let fixture: ComponentFixture<PaseListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaseListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaseListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
