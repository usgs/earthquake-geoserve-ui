import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CoordinateInputComponent } from './coordinate-input.component';
import { PlacesService } from '../places.service';

describe('CoordinateInputComponent', () => {
  let component: CoordinateInputComponent;
  let fixture: ComponentFixture<CoordinateInputComponent>;
  let getPlacesSpy;
  let placesService;

  beforeEach(async(() => {
    const placesServiceStub = {
      getPlaces: (latitude: string, longitude: string) => {
        console.log('stubbified!');
      }
     };

    TestBed.configureTestingModule({
      declarations: [
        CoordinateInputComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: PlacesService, useValue: placesServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinateInputComponent);
    component = fixture.componentInstance;
    placesService = fixture.debugElement.injector.get(PlacesService);
    getPlacesSpy = spyOn(placesService, 'getPlaces');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleClick', () => {
    it('should handle click', () => {
      component.handleClick('latitude', 'longitude');
      expect(placesService.getPlaces).toHaveBeenCalled();
      expect(placesService.getPlaces).toHaveBeenCalledWith('latitude', 'longitude');
    });
  });
});
