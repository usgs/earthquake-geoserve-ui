import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazdevTemplateHeaderComponent } from './hazdev-template-header.component';

describe('HazdevTemplateHeaderComponent', () => {
  let component: HazdevTemplateHeaderComponent;
  let fixture: ComponentFixture<HazdevTemplateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HazdevTemplateHeaderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazdevTemplateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
