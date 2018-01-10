import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GeocodeService } from '../geocode.service';
import { CoordinatesService } from '../coordinates.service';

import { GeocodeInputComponent } from './geocode-input.component';


describe('GeocodeInputComponent', () => {
  let component: GeocodeInputComponent;
  let fixture: ComponentFixture<GeocodeInputComponent>;
  let setCoordinatesSpy;
  let computeFromGeocodeSpy;
  let computeZoomFromConfidenceSpy;
  let getLocationSpy;
  let dialog;
  let dialogSpy;
  let coordinatesService;
  let geocodeService;

  const coordinates = {
    confidence: 1,
    latitude: 35,
    longitude: -105,
    method: 'coordinate',
    zoom: 16
  };

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      setCoordinates: (location: any) => {
        console.log('stubbified!');
      },
      computeFromGeocode: (geocodeLocation: any) => {
        console.log('stubbified!');
      },
      computeZoomFromConfidence: (confidence: number) => {
        console.log('stubbified!');
      }
    };

    const geocodeServiceStub = {
      getLocation: (address: string) => {
        console.log('stubbified!');
      },
      location: {
        subscribe: () => {
          console.log('stubbified!');
        }
      }
    };

    const dialogStub = {
      close: () => {
        console.log('stubbified!');
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        GeocodeInputComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule
      ],
      providers: [
        {provide: CoordinatesService, useValue: coordinatesServiceStub},
        {provide: GeocodeService, useValue: geocodeServiceStub},
        {provide: MatDialogRef, useValue: dialogStub}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeocodeInputComponent);
    component = fixture.componentInstance;

    // stub coordinates.service
    coordinatesService = fixture.debugElement.injector.get(CoordinatesService);
    setCoordinatesSpy = spyOn(coordinatesService, 'setCoordinates');
    computeFromGeocodeSpy = spyOn(coordinatesService, 'computeFromGeocode').and.returnValue(coordinates.confidence);
    computeZoomFromConfidenceSpy = spyOn(coordinatesService, 'computeZoomFromConfidence').and.returnValue(coordinates.zoom);

    // stub geocode.service
    geocodeService = fixture.debugElement.injector.get(GeocodeService);
    getLocationSpy = spyOn(geocodeService, 'getLocation');

    // stub dialog
    dialog = fixture.debugElement.injector.get(MatDialogRef);
    dialogSpy = spyOn(dialog, 'close');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
