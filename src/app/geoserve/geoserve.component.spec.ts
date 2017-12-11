import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { GeoserveComponent } from './geoserve.component';


describe('GeoserveComponent', () => {
  let component: GeoserveComponent;
  let fixture: ComponentFixture<GeoserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeoserveComponent,

        MockComponent({selector: 'app-admin-region', inputs: ['region']}),
        MockComponent({selector: 'app-authoritative-region'}),
        MockComponent({selector: 'app-coordinate-input'}),
        MockComponent({selector: 'app-location-map'}),
        MockComponent({selector: 'app-location-output'}),
        MockComponent({selector: 'app-nearby-places'}),
        MockComponent({selector: 'app-neic-catalog-region'}),
        MockComponent({selector: 'app-neic-response-region'}),
        MockComponent({selector: 'app-offshore-region'}),
        MockComponent({selector: 'app-tectonic-summary-region'}),
        MockComponent({selector: 'app-timezone-region'})
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
