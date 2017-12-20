import { TestBed, inject } from '@angular/core/testing';

import { CoordinatesService } from './coordinates.service';

describe('CoordinateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinatesService]
    });
  });

  it('should be created', inject([CoordinatesService], (service: CoordinateService) => {
    expect(service).toBeTruthy();
  }));
});
