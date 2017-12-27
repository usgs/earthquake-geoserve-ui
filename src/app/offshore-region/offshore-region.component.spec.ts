import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ListItemComponent } from '../list-item/list-item.component';
import { NoDataComponent } from '../no-data/no-data.component';
import { OffshoreRegionComponent } from './offshore-region.component';
import { RegionsService } from '../regions.service';

describe('OffshoreRegionComponent', () => {
  let component: OffshoreRegionComponent;
  let fixture: ComponentFixture<OffshoreRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListItemComponent,
        NoDataComponent,
        OffshoreRegionComponent
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
    fixture = TestBed.createComponent(OffshoreRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
