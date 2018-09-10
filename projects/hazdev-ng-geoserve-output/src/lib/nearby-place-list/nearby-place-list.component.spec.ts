import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyPlaceListComponent } from './nearby-place-list.component';

describe('NearbyPlaceListComponent', () => {
  let component: NearbyPlaceListComponent;
  let fixture: ComponentFixture<NearbyPlaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyPlaceListComponent ]
    })
    .compileComponents();
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
