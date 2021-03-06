import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordinatesService } from 'hazdev-ng-location-view';
import { LocationOutputComponent } from './location-output.component';

describe('LocationOutputComponent', () => {
  let component: LocationOutputComponent;
  let fixture: ComponentFixture<LocationOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationOutputComponent],
      providers: [HttpClient, HttpHandler, CoordinatesService]
    }).compileComponents();
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
