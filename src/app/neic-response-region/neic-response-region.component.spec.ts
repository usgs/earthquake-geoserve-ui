import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { NeicResponseRegionComponent } from './neic-response-region.component';
import { RegionsService } from '../regions.service';

describe('NeicResponseRegionComponent', () => {
  let component: NeicResponseRegionComponent;
  let fixture: ComponentFixture<NeicResponseRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeicResponseRegionComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        RegionsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeicResponseRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
