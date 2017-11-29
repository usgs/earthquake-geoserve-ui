import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazdevTemplateNavigationComponent } from './hazdev-template-navigation.component';

describe('HazdevTemplateNavigationComponent', () => {
  let component: HazdevTemplateNavigationComponent;
  let fixture: ComponentFixture<HazdevTemplateNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazdevTemplateNavigationComponent ]
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
