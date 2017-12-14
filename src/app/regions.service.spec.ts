import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegionsService } from './regions.service';

describe('RegionsService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed,
      regionsService: RegionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegionsService
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
      const regions = regionsService.adminRegions;

      regions.subscribe(spy);
      regionsService.empty();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('getRegions', () => {
    it('calls http get', () => {
      const regionsJson = {
        admin: {
          features: [
            'feature 1',
            'feature 2'
          ]
        }
      };

      regionsService.getRegions('latitude', 'longitude');

      const request = httpClient.expectOne(regionsService.API_URL +
        '?latitude=latitude&longitude=longitude&type=event');

      expect(request.request.method).toBe('GET');
      request.flush(regionsJson);

      regionsService.adminRegions.subscribe((result) => {
        expect(result).toEqual(regionsJson.admin.features);
      });
    });

    it('handles errors', () => {
      regionsService.getRegions('latitude', 'longitude');

      const request = httpClient.expectOne(regionsService.API_URL +
        '?latitude=latitude&longitude=longitude&type=event');

      request.error(null);

      regionsService.adminRegions.subscribe((result) => {
        expect(result.length).toBe(0);
      });
    });
  });
});
