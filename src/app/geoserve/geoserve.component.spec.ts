import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlaysService } from 'hazdev-ng-geoserve-output';
import { MockComponent } from 'ng2-mock-component';

import { GeoserveComponent } from './geoserve.component';

describe('GeoserveComponent', () => {
  let component: GeoserveComponent;
  let fixture: ComponentFixture<GeoserveComponent>;

  beforeEach(async(() => {
    const overlaysServiceStub = {
      getOverlays: () => {
        console.log('stubbified!');
      },
      overlays$: {
        subscribe: () => {
          console.log('stubbified!');
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        GeoserveComponent,

        MockComponent({ selector: 'geoserve-output' }),
        MockComponent({ selector: 'location-input-map' })
      ],
      providers: [{ provide: OverlaysService, useValue: overlaysServiceStub }]
    }).compileComponents();
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
