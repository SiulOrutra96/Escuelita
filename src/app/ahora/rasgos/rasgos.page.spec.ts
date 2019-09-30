import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasgosPage } from './rasgos.page';

describe('RasgosPage', () => {
  let component: RasgosPage;
  let fixture: ComponentFixture<RasgosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasgosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasgosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
