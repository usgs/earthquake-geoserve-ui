import { TestBed, async } from '@angular/core/testing';

import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AppComponent } from './app.component';
import { AuthoritativeRegionComponent } from './authoritative-region/authoritative-region.component';
import { CoordinateInputComponent } from './coordinate-input/coordinate-input.component';
import { HazdevTemplateComponent } from './hazdev-template/hazdev-template.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationOutputComponent } from './location-output/location-output.component';
import { NearbyPlacesComponent } from './nearby-places/nearby-places.component';
import { NeicCatalogRegionComponent } from './neic-catalog-region/neic-catalog-region.component';
import { NeicResponseRegionComponent } from './neic-response-region/neic-response-region.component';
import { OffshoreRegionComponent } from './offshore-region/offshore-region.component';
import { TectonicSummaryRegionComponent } from './tectonic-summary-region/tectonic-summary-region.component';
import { TimezoneRegionComponent } from './timezone-region/timezone-region.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegionComponent,
        AppComponent,
        AuthoritativeRegionComponent,
        CoordinateInputComponent,
        HazdevTemplateComponent,
        LocationMapComponent,
        LocationOutputComponent,
        NearbyPlacesComponent,
        NeicCatalogRegionComponent,
        NeicResponseRegionComponent,
        OffshoreRegionComponent,
        TectonicSummaryRegionComponent,
        TimezoneRegionComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Geoserve'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.TITLE).toEqual('Geoserve');
  }));
  /**
   * Saving as example for how to check DOM. This rendering is elsewhere now.
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Geoserve');
  }));
  **/
});
