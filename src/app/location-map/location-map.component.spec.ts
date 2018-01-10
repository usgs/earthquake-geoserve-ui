import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

import { LocationMapComponent } from './location-map.component';

import { CoordinatesService } from '../coordinates.service';

describe('LocationMapComponent', () => {
  let component: LocationMapComponent;
  let fixture: ComponentFixture<LocationMapComponent>;

  beforeEach(async(() => {
    const coordinatesServiceStub = {
      computeFromPoint: (geocodeLocation: any) => {
        console.log('stubbified!');
      },
      coordinates: {
        subscribe: () => {
          console.log('stubbified!');
        }
      }
    };

    const dialogStub = {
      open: () => {
        console.log('stubbified!');
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        LocationMapComponent
      ],
      providers: [
        {provide: CoordinatesService, useValue: coordinatesServiceStub},
        {provide: MatDialog, useValue: dialogStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
