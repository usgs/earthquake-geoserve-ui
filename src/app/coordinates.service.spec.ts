import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CoordinatesService } from './coordinates.service';
import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';

describe('CoordinatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoordinatesService,
        PlacesService,
        RegionsService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([CoordinatesService], (service: CoordinatesService) => {
    expect(service).toBeTruthy();
  }));
});
