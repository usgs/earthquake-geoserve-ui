import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { AdminRegionComponent } from '../admin-region/admin-region.component';
import { AppComponent } from '../app.component';
import { AuthoritativeRegionComponent } from '../authoritative-region/authoritative-region.component';
import { CoordinateInputComponent } from '../coordinate-input/coordinate-input.component';
import { GeoserveComponent } from './geoserve.component';
import { HazdevTemplateComponent } from '../hazdev-template/hazdev-template.component';
import { LocationMapComponent } from '../location-map/location-map.component';
import { LocationOutputComponent } from '../location-output/location-output.component';
import { NearbyPlacesComponent } from '../nearby-places/nearby-places.component';
import { NeicCatalogRegionComponent } from '../neic-catalog-region/neic-catalog-region.component';
import { NeicResponseRegionComponent } from '../neic-response-region/neic-response-region.component';
import { OffshoreRegionComponent } from '../offshore-region/offshore-region.component';
import { TectonicSummaryRegionComponent } from '../tectonic-summary-region/tectonic-summary-region.component';
import { TimezoneRegionComponent } from '../timezone-region/timezone-region.component';

describe('GeoserveComponent', () => {
  let component: GeoserveComponent;
  let fixture: ComponentFixture<GeoserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegionComponent,
        AppComponent,
        AuthoritativeRegionComponent,
        CoordinateInputComponent,
        GeoserveComponent,
        HazdevTemplateComponent,
        LocationMapComponent,
        LocationOutputComponent,
        NearbyPlacesComponent,
        NeicCatalogRegionComponent,
        NeicResponseRegionComponent,
        OffshoreRegionComponent,
        TectonicSummaryRegionComponent,
        TimezoneRegionComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
