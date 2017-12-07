import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyPlaceComponent } from './nearby-place.component';

describe('NearbyPlaceComponent', () => {
  let component: NearbyPlaceComponent;
  let fixture: ComponentFixture<NearbyPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyPlaceComponent);
    component = fixture.componentInstance;
    component.place = {
      'type': 'Feature',
      'id': 5496542,
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -104.99111,
          34.97645,
          1633
        ]
      },
      'properties': {
        'admin1_code': 'NM',
        'admin1_name': 'New Mexico',
        'azimuth': 162.7,
        'country_code': 'US',
        'country_name': 'United States',
        'distance': 2.736,
        'feature_class': 'P',
        'feature_code': 'PPL',
        'name': 'Vegas Junction',
        'population': 0
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getName', () => {
    it('should return the formatted name components', () => {
      const place = {
        properties: {
          name: 'name',
          admin1_name: 'admin1_name',
          country_name: 'country_name'
        }
      };
      expect(component.getName(place)).toEqual('name, admin1_name, country_name');
    });
  });

  describe('compassWinds', () => {
    it('should accept compass wind as input and preserve', () => {
      expect(component.compassWinds('SSE')).toEqual('SSE');
     });
  });
});
