import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import {
  OverlaysService,
  PlacesService,
  RegionsService
} from 'hazdev-ng-geoserve-output';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { MockComponent } from 'ng2-mock-component';

import { GeoserveComponent } from './geoserve.component';

describe('GeoserveComponent', () => {
  let component: GeoserveComponent;
  let fixture: ComponentFixture<GeoserveComponent>;

  beforeEach(async(() => {
    const overlaysServiceStub = {
      getOverlays: () => {
        console.log('stubbified!');
      },
      overlays$: {
        subscribe: () => {
          console.log('stubbified!');
        }
      }
    };
    const coordinatesServiceStub = {
      coordinates$: {
        subscribe: () => {
          console.log('stubbified!');
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        GeoserveComponent,

        MockComponent({ selector: 'geoserve-output' }),
        MockComponent({ selector: 'location-input-map' })
      ],
      providers: [
        { provide: OverlaysService, useValue: overlaysServiceStub },
        { provide: PlacesService, useValue: {} },
        { provide: RegionsService, useValue: {} },
        { provide: CoordinatesService, useValue: coordinatesServiceStub },
        { provide: MatDialog, useValue: {} }
      ]
    }).compileComponents();
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
