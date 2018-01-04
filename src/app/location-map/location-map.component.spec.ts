import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as L from 'leaflet';
import { LocationMapComponent } from './location-map.component';

import { CoordinatesService } from '../coordinates.service';

describe('LocationMapComponent', () => {
  let component: LocationMapComponent;
  let fixture: ComponentFixture<LocationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocationMapComponent,
        L
      ],
      providers: [
        CoordinatesService
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
