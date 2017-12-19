import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OffshoreRegionComponent } from './offshore-region.component';
import { RegionsService } from '../regions.service';

describe('OffshoreRegionComponent', () => {
  let component: OffshoreRegionComponent;
  let fixture: ComponentFixture<OffshoreRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffshoreRegionComponent ],
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
