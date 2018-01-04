import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocodeInputComponent } from './geocode-input.component';

describe('GeocodeInputComponent', () => {
  let component: GeocodeInputComponent;
  let fixture: ComponentFixture<GeocodeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeocodeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeocodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
