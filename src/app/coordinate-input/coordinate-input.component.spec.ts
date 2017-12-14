import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CoordinateInputComponent } from './coordinate-input.component';
import { PlacesService } from '../places.service';
import { RegionsService } from '../regions.service';

describe('CoordinateInputComponent', () => {
  let component: CoordinateInputComponent;
  let fixture: ComponentFixture<CoordinateInputComponent>;
  let getPlacesSpy;
  let getRegionsSpy;
  let placesService;
  let regionsService;

  beforeEach(async(() => {
    const placesServiceStub = {
      getPlaces: (latitude: string, longitude: string) => {
        console.log('stubbified!');
      }
    };

    const regionsServiceStub = {
      getRegions: (latitude: string, longitude: string) => {
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
        {provide: PlacesService, useValue: placesServiceStub},
        {provide: RegionsService, useValue: regionsServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinateInputComponent);
    component = fixture.componentInstance;
    placesService = fixture.debugElement.injector.get(PlacesService);
    getPlacesSpy = spyOn(placesService, 'getPlaces');
    regionsService = fixture.debugElement.injector.get(RegionsService);
    getRegionsSpy = spyOn(regionsService, 'getRegions');

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
      expect(regionsService.getRegions).toHaveBeenCalled();
      expect(regionsService.getRegions).toHaveBeenCalledWith('latitude', 'longitude');
    });
  });
});
