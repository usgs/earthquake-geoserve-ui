import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { CoordinatesService } from '../../core/coordinates.service';
import { PlacesService } from '../../core/places.service';
import { RegionsService } from '../../core/regions.service';

import { LocationOutputComponent } from './location-output.component';

describe('LocationOutputComponent', () => {
  let component: LocationOutputComponent;
  let fixture: ComponentFixture<LocationOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationOutputComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        CoordinatesService,
        PlacesService,
        RegionsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
