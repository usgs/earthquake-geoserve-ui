import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RegionsService } from '../../regions.service';

import { AdminRegionComponent } from './admin-region.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { NoDataComponent } from '../no-data/no-data.component';


describe('AdminRegionComponent', () => {
  let component: AdminRegionComponent;
  let fixture: ComponentFixture<AdminRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegionComponent,
        ListItemComponent,
        NoDataComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
        {provide: RegionsService, useValue: {}}
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
