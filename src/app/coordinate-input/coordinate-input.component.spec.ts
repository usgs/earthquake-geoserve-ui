import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateInputComponent } from './coordinate-input.component';

describe('CoordinateInputComponent', () => {
  let component: CoordinateInputComponent;
  let fixture: ComponentFixture<CoordinateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
