import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazdevTemplateContentComponent } from './hazdev-template-content.component';

describe('HazdevTemplateContentComponent', () => {
  let component: HazdevTemplateContentComponent;
  let fixture: ComponentFixture<HazdevTemplateContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazdevTemplateContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazdevTemplateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
