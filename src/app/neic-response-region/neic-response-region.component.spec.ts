import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RegionsService } from '../regions.service';

import { NeicResponseRegionComponent } from './neic-response-region.component';
import { NoDataComponent } from '../no-data/no-data.component';


describe('NeicResponseRegionComponent', () => {
  let component: NeicResponseRegionComponent;
  let fixture: ComponentFixture<NeicResponseRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NeicResponseRegionComponent,
        NoDataComponent
      ],
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
