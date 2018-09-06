import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RegionsService } from '../regions.service';

import { ListItemComponent } from '../list-item/list-item.component';
import { NeicCatalogRegionComponent } from './neic-catalog-region.component';
import { NoDataComponent } from '../no-data/no-data.component';


describe('NeicCatalogRegionComponent', () => {
  let component: NeicCatalogRegionComponent;
  let fixture: ComponentFixture<NeicCatalogRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListItemComponent,
        NeicCatalogRegionComponent,
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
    fixture = TestBed.createComponent(NeicCatalogRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
