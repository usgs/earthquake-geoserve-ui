import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { MatDialog} from '@angular/material';

import { GeoserveOutputComponent } from './geoserve-output.component';

import { CoordinatesService } from '../coordinates.service';

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

        MockComponent({selector: 'app-admin-region', inputs: ['region']}),
        MockComponent({selector: 'app-authoritative-region'}),
        MockComponent({selector: 'app-coordinate-input'}),
        MockComponent({selector: 'app-location-output'}),
        MockComponent({selector: 'app-nearby-places'}),
        MockComponent({selector: 'app-neic-catalog-region'}),
        MockComponent({selector: 'app-neic-response-region'}),
        MockComponent({selector: 'app-offshore-region'}),
        MockComponent({selector: 'app-tectonic-summary-region'})
      ],
      providers: [
        {provide: CoordinatesService, useValue: coordinatesServiceStub},
        {provide: MatDialog, useValue: dialogStub}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoserveOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // stub coordinates.service
    coordinatesService = fixture.debugElement.injector.get(CoordinatesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
