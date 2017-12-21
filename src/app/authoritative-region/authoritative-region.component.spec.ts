import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RegionsService } from '../regions.service';

import { AuthoritativeRegionComponent } from './authoritative-region.component';
import { NoDataComponent } from '../no-data/no-data.component';


describe('AuthoritativeRegionComponent', () => {
  let component: AuthoritativeRegionComponent;
  let fixture: ComponentFixture<AuthoritativeRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthoritativeRegionComponent,
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
    fixture = TestBed.createComponent(AuthoritativeRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
