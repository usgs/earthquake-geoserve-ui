import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RegionsService } from '../regions.service';

import { NeicCatalogRegionComponent } from './neic-catalog-region.component';
import { NoDataComponent } from '../no-data/no-data.component';


describe('NeicCatalogRegionComponent', () => {
  let component: NeicCatalogRegionComponent;
  let fixture: ComponentFixture<NeicCatalogRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NeicCatalogRegionComponent,
        NoDataComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
        RegionsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeicCatalogRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
