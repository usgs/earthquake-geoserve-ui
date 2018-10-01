import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyPlaceComponent } from './nearby-place.component';
import { Place } from '../place';

describe('NearbyPlaceComponent', () => {
  let component: NearbyPlaceComponent;
  let fixture: ComponentFixture<NearbyPlaceComponent>;
  let place: Place;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NearbyPlaceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyPlaceComponent);
    component = fixture.componentInstance;

    place = {
      admin1_code: 'NM',
      admin1_name: 'New Mexico',
      azimuth: -197.3,
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

  describe('getName', () => {
    it('should return the formatted name components', () => {
      expect(component.getName(place)).toEqual(
        'Vegas Junction, New Mexico, United States'
      );
    });
  });

  describe('compassWinds', () => {
    it('should accept compass wind as input and preserve', () => {
      expect(component.compassWinds('SSE')).toEqual('SSE');
    });
    it('should calculate correct winds when azimuth is negative', () => {
      expect(component.compassWinds(place.azimuth)).toEqual('SSE');
    });
    it('should calculate correct winds when azimuth is negative', () => {
      expect(component.compassWinds(162.7)).toEqual('SSE');
    });
  });
});
