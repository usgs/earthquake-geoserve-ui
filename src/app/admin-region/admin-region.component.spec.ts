import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RegionsService } from '../regions.service';

import { AdminRegionComponent } from './admin-region.component';
import { NoDataComponent } from '../no-data/no-data.component';


describe('AdminRegionComponent', () => {
  let component: AdminRegionComponent;
  let fixture: ComponentFixture<AdminRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegionComponent,
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
    fixture = TestBed.createComponent(AdminRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
