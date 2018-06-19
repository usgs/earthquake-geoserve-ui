import { TestBed, inject } from '@angular/core/testing';

import { LocationInputService } from './location-input.service';

describe('LocationInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationInputService]
    });
  });

  it('should be created', inject([LocationInputService], (service: LocationInputService) => {
    expect(service).toBeTruthy();
  }));
});
