import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhoraPage } from './ahora.page';

describe('AhoraPage', () => {
  let component: AhoraPage;
  let fixture: ComponentFixture<AhoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhoraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
