import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { GeoserveComponent } from './geoserve.component';

describe('GeoserveComponent', () => {
  let component: GeoserveComponent;
  let fixture: ComponentFixture<GeoserveComponent>;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [
        GeoserveComponent,

        MockComponent({selector: 'app-geoserve-output'}),
        MockComponent({selector: 'app-location-map'})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
