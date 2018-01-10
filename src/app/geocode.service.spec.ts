import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CoordinatesService } from './coordinates.service';
import { GeocodeService } from './geocode.service';

describe('GeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoordinatesService,
        GeocodeService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([GeocodeService], (service: GeocodeService) => {
    expect(service).toBeTruthy();
  }));
});
