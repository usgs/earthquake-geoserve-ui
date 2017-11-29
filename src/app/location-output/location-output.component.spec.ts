import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOutputComponent } from './location-output.component';

describe('LocationOutputComponent', () => {
  let component: LocationOutputComponent;
  let fixture: ComponentFixture<LocationOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationOutputComponent ]
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
