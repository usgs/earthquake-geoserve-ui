import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AuthoritativeRegionComponent } from './authoritative-region.component';
import { RegionsService } from '../regions.service';

describe('AuthoritativeRegionComponent', () => {
  let component: AuthoritativeRegionComponent;
  let fixture: ComponentFixture<AuthoritativeRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoritativeRegionComponent ],
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
