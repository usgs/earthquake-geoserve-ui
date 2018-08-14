import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { MockComponent } from 'ng2-mock-component';

import { GeoserveOutputComponent } from './geoserve-output.component';

describe('GeoserveOutputComponent', () => {
  let component: GeoserveOutputComponent;
  let fixture: ComponentFixture<GeoserveOutputComponent>;
  let coordinatesService;

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      setCoordinates: (location: any) => {
        console.log('stubbified!');
      }
    };

    const dialogStub = {
      open: () => {
        console.log('stubbified!');
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        GeoserveOutputComponent,

        MockComponent({
          selector: 'geoserve-admin-region',
          inputs: ['region']
        }),
        MockComponent({ selector: 'geoserve-authoritative-region' }),
        MockComponent({ selector: 'geoserve-coordinate-input' }),
        MockComponent({ selector: 'geoserve-location-output' }),
        MockComponent({ selector: 'geoserve-nearby-places' }),
        MockComponent({ selector: 'geoserve-neic-catalog-region' }),
        MockComponent({ selector: 'geoserve-neic-response-region' }),
        MockComponent({ selector: 'geoserve-offshore-region' }),
        MockComponent({ selector: 'geoserve-tectonic-summary-region' })
      ],
      providers: [
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: MatDialog, useValue: dialogStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoserveOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // stub coordinates.service
    coordinatesService = fixture.debugElement.injector.get<CoordinatesService>(
      CoordinatesService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
