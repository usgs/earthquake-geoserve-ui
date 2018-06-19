import { TestBed, inject } from '@angular/core/testing';

import { GeoserveOutputService } from './geoserve-output.service';

describe('GeoserveOutputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoserveOutputService]
    });
  });

  it('should be created', inject([GeoserveOutputService], (service: GeoserveOutputService) => {
    expect(service).toBeTruthy();
  }));
});
