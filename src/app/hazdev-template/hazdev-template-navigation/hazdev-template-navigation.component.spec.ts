import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent } from 'ng2-mock-component';

import { HazdevTemplateNavigationComponent } from './hazdev-template-navigation.component';


describe('HazdevTemplateNavigationComponent', () => {
  let component: HazdevTemplateNavigationComponent;
  let fixture: ComponentFixture<HazdevTemplateNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HazdevTemplateNavigationComponent,

        MockComponent({selector: 'mat-divider'}),
        MockComponent({selector: 'mat-form-field'}),
        MockComponent({selector: 'mat-nav-list'})
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazdevTemplateNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
