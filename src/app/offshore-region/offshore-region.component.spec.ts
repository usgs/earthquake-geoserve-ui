import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffshoreRegionComponent } from './offshore-region.component';

describe('OffshoreRegionComponent', () => {
  let component: OffshoreRegionComponent;
  let fixture: ComponentFixture<OffshoreRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffshoreRegionComponent ]
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
