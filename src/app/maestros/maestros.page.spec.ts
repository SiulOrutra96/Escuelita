import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrosPage } from './maestros.page';

describe('MaestrosPage', () => {
  let component: MaestrosPage;
  let fixture: ComponentFixture<MaestrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestrosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
