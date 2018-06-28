import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoordinatesService } from 'hazdev-ng-location-input';
import { RegionsService } from './regions.service';

describe('RegionsService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed,
      regionsService: RegionsService;

  beforeEach(() => {
    const coordinatesServiceStub = {
      coordinates$: {
        subscribe: () => {
          console.log('stubbified!');
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegionsService,
        {provide: CoordinatesService, useValue: coordinatesServiceStub}
      ]
    });

    injector = getTestBed();
    regionsService = injector.get(RegionsService);
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', inject([RegionsService], (service: RegionsService) => {
    expect(service).toBeTruthy();
  }));

  describe('empty', () => {
    it('notifies with null', () => {
      const spy = jasmine.createSpy('subscriber spy');
      const regions = regionsService.adminRegions$;

      regions.subscribe(spy);
      regionsService.empty();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('getRegions', () => {
    it('calls http get', () => {
      let latitude,
          longitude;

      const regionsJson = {
        admin: {
          features: [
            'feature'
          ]
        }
      };

      latitude = 0;
      longitude = 0;
      regionsService.getRegions(latitude, longitude);

      const request = httpClient.expectOne(regionsService.REGIONS_URL +
        `?latitude=${latitude}&longitude=${longitude}`);

      expect(request.request.method).toBe('GET');
      request.flush(regionsJson);

      regionsService.adminRegions$.subscribe((result) => {
        expect(result).toEqual(regionsJson.admin.features[0]);
      });
    });

    it('handles errors', () => {
      let latitude,
          longitude;

      latitude = 0;
      longitude = 0;
      regionsService.getRegions(latitude, longitude);

      const request = httpClient.expectOne(regionsService.REGIONS_URL +
        `?latitude=${latitude}&longitude=${longitude}`);

      request.error(new ErrorEvent('You may safely ignore this error.'));

      regionsService.adminRegions$.subscribe((result) => {
        expect(result).toBe(null);
      });
    });
  });

  describe('buildUrl', () => {
    it('returns a url', () => {
      let url;

      const lat = 0;
      const lng = 0;

      url = regionsService.buildUrl(lat, lng);

      expect(url.indexOf(`latitude=${lat}`)).not.toEqual(-1);
      expect(url.indexOf(`longitude=${lng}`)).not.toEqual(-1);
    });
    it('normalizes longitude in the url', () => {
      let lng,
          url;

      const lat = 0;
      lng = 720;

      url = regionsService.buildUrl(lat, lng);

      expect(url.indexOf(`latitude=${lat}`)).not.toEqual(-1);
      expect(url.indexOf(`longitude=0`)).not.toEqual(-1);

      lng = -720;

      url = regionsService.buildUrl(lat, lng);

      expect(url.indexOf(`latitude=${lat}`)).not.toEqual(-1);
      expect(url.indexOf(`longitude=0`)).not.toEqual(-1);
    });
  });
});
