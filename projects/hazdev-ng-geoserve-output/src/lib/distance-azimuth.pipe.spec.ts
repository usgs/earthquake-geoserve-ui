import { DistanceAzimuthPipe } from './distance-azimuth.pipe';

describe('DistanceAzimuthPipe', () => {
  let pipe;
  let place;

  beforeEach(() => {
    pipe = new DistanceAzimuthPipe();

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

  describe('compassWinds', () => {
    it('should accept compass wind as input and preserve', () => {
      expect(pipe.compassWinds('SSE')).toEqual('SSE');
    });
    it('should calculate correct winds when azimuth is negative', () => {
      expect(pipe.compassWinds(place.azimuth)).toEqual('SSE');
    });
    it('should calculate correct winds when azimuth is negative', () => {
      expect(pipe.compassWinds(162.7)).toEqual('SSE');
    });
    it('should calculate correct winds when azimuth is negative', () => {
      expect(pipe.compassWinds(522.7)).toEqual('SSE');
    });
  });
});
