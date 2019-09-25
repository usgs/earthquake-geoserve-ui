import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceAzimuthPipe } from '../distance-azimuth.pipe';
import { NearbyPlaceListComponent } from './nearby-place-list.component';
import { NearbyPlaceComponent } from '../nearby-place/nearby-place.component';
import { NoDataComponent } from '../no-data/no-data.component';
import { PlaceNamePipe } from '../place-name.pipe';

describe('NearbyPlaceListComponent', () => {
  let component: NearbyPlaceListComponent;
  let fixture: ComponentFixture<NearbyPlaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DistanceAzimuthPipe,
        NearbyPlaceComponent,
        NearbyPlaceListComponent,
        NoDataComponent,
        PlaceNamePipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyPlaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
