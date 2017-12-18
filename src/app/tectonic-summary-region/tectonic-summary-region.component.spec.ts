import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { TectonicSummaryRegionComponent } from './tectonic-summary-region.component';
import { RegionsService } from '../regions.service';

describe('TectonicSummaryRegionComponent', () => {
  let component: TectonicSummaryRegionComponent;
  let fixture: ComponentFixture<TectonicSummaryRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TectonicSummaryRegionComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        RegionsService
      ]
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
