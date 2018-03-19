import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { NoDataComponent } from '../no-data/no-data.component';
import { TectonicSummaryRegionComponent } from './tectonic-summary-region.component';
import { RegionsService } from '../../core/regions.service';

describe('TectonicSummaryRegionComponent', () => {
  let component: TectonicSummaryRegionComponent;
  let fixture: ComponentFixture<TectonicSummaryRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoDataComponent,
        TectonicSummaryRegionComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
        {provide: RegionsService, useValue: {}}
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
