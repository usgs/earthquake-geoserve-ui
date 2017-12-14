import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AdminRegionComponent } from './admin-region.component';
import { RegionsService } from '../regions.service';

describe('AdminRegionComponent', () => {
  let component: AdminRegionComponent;
  let fixture: ComponentFixture<AdminRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegionComponent ],
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
