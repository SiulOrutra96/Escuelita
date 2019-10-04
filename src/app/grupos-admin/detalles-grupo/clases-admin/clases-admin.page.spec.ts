import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesAdminPage } from './clases-admin.page';

describe('ClasesPage', () => {
  let component: ClasesAdminPage;
  let fixture: ComponentFixture<ClasesAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
