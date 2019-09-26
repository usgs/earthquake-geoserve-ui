import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceAzimuthPipe } from '../distance-azimuth.pipe';
import { NearbyPlaceComponent } from './nearby-place.component';
import { Place } from '../place';
import { PlaceNamePipe } from '../place-name.pipe';

describe('NearbyPlaceComponent', () => {
  let component: NearbyPlaceComponent;
  let fixture: ComponentFixture<NearbyPlaceComponent>;
  let place: Place;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistanceAzimuthPipe, NearbyPlaceComponent, PlaceNamePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyPlaceComponent);
    component = fixture.componentInstance;

    place = {
      admin1_code: 'NM',
      admin1_name: 'New Mexico',
      azimuth: -557.3,
      country_code: 'US',
      country_name: 'United States',
      distance: 2.736,
      elevation: 1633,
      feature_class: 'P',
      feature_code: 'PPL',
      latitude: 34.97645,
      longitude: -104.99111,
      name: 'Vegas Junction',
      population: 0
    };

    component.place = place;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
