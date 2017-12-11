import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazdevTemplatePageComponent } from './hazdev-template-page.component';

describe('HazdevTemplatePageComponent', () => {
  let component: HazdevTemplatePageComponent;
  let fixture: ComponentFixture<HazdevTemplatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazdevTemplatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazdevTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
