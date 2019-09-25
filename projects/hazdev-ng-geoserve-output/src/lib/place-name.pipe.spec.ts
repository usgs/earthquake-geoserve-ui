import { PlaceNamePipe } from './place-name.pipe';

describe('PlaceNamePipe', () => {
  let pipe;
  let place;

  beforeEach(() => {
    pipe = new PlaceNamePipe();
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
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return the formatted name components', () => {
      expect(pipe.transform(place)).toEqual(
        'Vegas Junction, New Mexico, United States'
      );
    });
  });
});
