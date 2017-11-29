import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeicResponseRegionComponent } from './neic-response-region.component';

describe('NeicResponseRegionComponent', () => {
  let component: NeicResponseRegionComponent;
  let fixture: ComponentFixture<NeicResponseRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeicResponseRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeicResponseRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
