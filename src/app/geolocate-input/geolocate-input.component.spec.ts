import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocateInputComponent } from './geolocate-input.component';

describe('GeolocateInputComponent', () => {
  let component: GeolocateInputComponent;
  let fixture: ComponentFixture<GeolocateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
