import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoserveOutputComponent } from './geoserve-output.component';

describe('GeoserveOutputComponent', () => {
  let component: GeoserveOutputComponent;
  let fixture: ComponentFixture<GeoserveOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoserveOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoserveOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
