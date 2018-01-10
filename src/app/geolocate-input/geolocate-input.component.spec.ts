import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CoordinatesService } from '../coordinates.service';

import { GeolocateInputComponent } from './geolocate-input.component';


describe('GeolocateInputComponent', () => {
  let component: GeolocateInputComponent;
  let fixture: ComponentFixture<GeolocateInputComponent>;
  let setCoordinatesSpy;
  let computeFromGeolocateSpy;
  let computeZoomFromConfidenceSpy;
  let dialog;
  let dialogSpy;
  let coordinatesService;

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
      computeFromGeolocate: (accuracy: number) => {
        console.log('stubbified!');
      },
      computeZoomFromConfidence: (confidence: number) => {
        console.log('stubbified!');
      }
    };

    const dialogStub = {
      close: () => {
        console.log('stubbified!');
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        GeolocateInputComponent
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
        {provide: MatDialogRef, useValue: dialogStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // stub coordinates.service
    coordinatesService = fixture.debugElement.injector.get(CoordinatesService);
    setCoordinatesSpy = spyOn(coordinatesService, 'setCoordinates');
    computeFromGeolocateSpy = spyOn(coordinatesService, 'computeFromGeolocate').and.returnValue(coordinates.confidence);
    computeZoomFromConfidenceSpy = spyOn(coordinatesService, 'computeZoomFromConfidence').and.returnValue(coordinates.zoom);

    // stub dialog
    dialog = fixture.debugElement.injector.get(MatDialogRef);
    dialogSpy = spyOn(dialog, 'close');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
