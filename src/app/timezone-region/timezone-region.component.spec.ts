import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneRegionComponent } from './timezone-region.component';

describe('TimezoneRegionComponent', () => {
  let component: TimezoneRegionComponent;
  let fixture: ComponentFixture<TimezoneRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimezoneRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezoneRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
