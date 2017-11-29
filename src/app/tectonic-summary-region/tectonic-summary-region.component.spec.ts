import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TectonicSummaryRegionComponent } from './tectonic-summary-region.component';

describe('TectonicSummaryRegionComponent', () => {
  let component: TectonicSummaryRegionComponent;
  let fixture: ComponentFixture<TectonicSummaryRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TectonicSummaryRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TectonicSummaryRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
