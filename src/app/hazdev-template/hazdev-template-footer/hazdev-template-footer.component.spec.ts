import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazdevTemplateFooterComponent } from './hazdev-template-footer.component';

describe('HazdevTemplateFooterComponent', () => {
  let component: HazdevTemplateFooterComponent;
  let fixture: ComponentFixture<HazdevTemplateFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazdevTemplateFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazdevTemplateFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
