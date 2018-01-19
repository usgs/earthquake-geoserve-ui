import { TestBed, inject } from '@angular/core/testing';

import { OverlaysService } from './overlays.service';

describe('OverlaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverlaysService]
    });
  });

  it('should be created', inject([OverlaysService], (service: OverlaysService) => {
    expect(service).toBeTruthy();
  }));
});
