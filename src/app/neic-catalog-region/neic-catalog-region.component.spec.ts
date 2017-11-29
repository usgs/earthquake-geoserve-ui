import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeicCatalogRegionComponent } from './neic-catalog-region.component';

describe('NeicCatalogRegionComponent', () => {
  let component: NeicCatalogRegionComponent;
  let fixture: ComponentFixture<NeicCatalogRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeicCatalogRegionComponent ]
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
