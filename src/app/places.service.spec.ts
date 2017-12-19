import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlacesService } from './places.service';

describe('PlacesService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed,
      placesService: PlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PlacesService
      ]
    });

    injector = getTestBed();
    placesService = injector.get(PlacesService);
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([PlacesService], (service: PlacesService) => {
    expect(service).toBeTruthy();
  }));

  describe('empty', () => {

    it('notifies with null', () => {
      const spy = jasmine.createSpy('subscriber spy');
      const places = placesService.places;

      places.subscribe(spy);
      placesService.empty();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('getPlaces', () => {
    it('calls http get', () => {
      const placesJson = {
        event: {
          features: [
            'feature 1',
            'feature 2'
          ]
        }
      };

      placesService.getPlaces('latitude', 'longitude');

      const request = httpClient.expectOne(placesService.API_URL +
        '?latitude=latitude&longitude=longitude&type=event');

      expect(request.request.method).toBe('GET');
      request.flush(placesJson);

      placesService.places.subscribe((result) => {
        expect(result).toEqual(placesJson.event.features);
      });
    });

    it('handles errors', () => {
      placesService.getPlaces('latitude', 'longitude');

      const request = httpClient.expectOne(placesService.API_URL +
        '?latitude=latitude&longitude=longitude&type=event');

      request.error(new ErrorEvent('You may safely ignore this error.'));

      placesService.places.subscribe((result) => {
        expect(result.length).toBe(0);
      });
    });
  });
});
