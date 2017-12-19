import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { NeicCatalogRegionComponent } from './neic-catalog-region.component';
import { RegionsService } from '../regions.service';

describe('NeicCatalogRegionComponent', () => {
  let component: NeicCatalogRegionComponent;
  let fixture: ComponentFixture<NeicCatalogRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeicCatalogRegionComponent ],
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
