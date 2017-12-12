import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatButtonModule, MatSidenavModule, MatListModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';

import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';

import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AppComponent } from './app.component';
import { AuthoritativeRegionComponent } from './authoritative-region/authoritative-region.component';
import { CoordinateInputComponent } from './coordinate-input/coordinate-input.component';
import { GeoserveComponent } from './geoserve/geoserve.component';
import { HazdevTemplateComponent } from './hazdev-template/hazdev-template.component';
import { HazdevTemplateHeaderComponent } from './hazdev-template-header/hazdev-template-header.component';
import { HazdevTemplateNavigationComponent } from './hazdev-template-navigation/hazdev-template-navigation.component';
import { HazdevTemplatePageComponent } from './hazdev-template-page/hazdev-template-page.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationOutputComponent } from './location-output/location-output.component';
import { NearbyPlaceComponent } from './nearby-place/nearby-place.component';
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
        GeoserveComponent,
        HazdevTemplateComponent,
        HazdevTemplateHeaderComponent,
        HazdevTemplateNavigationComponent,
        HazdevTemplatePageComponent,
        LocationMapComponent,
        LocationOutputComponent,
        NearbyPlaceComponent,
        NearbyPlacesComponent,
        NeicCatalogRegionComponent,
        NeicResponseRegionComponent,
        OffshoreRegionComponent,
        TectonicSummaryRegionComponent,
        TimezoneRegionComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule
      ],
      providers: [
        PlacesService,
        RegionsService,
        MediaMatcher,
        BrowserModule,
        HttpClientModule
      ],
      providers: [
        PlacesService,
        RegionsService
      ]
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
