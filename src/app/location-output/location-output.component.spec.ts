import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { PlacesService } from '../places.service';

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
        PlacesService
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
