import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoritativeRegionComponent } from './authoritative-region.component';

describe('AuthoritativeRegionComponent', () => {
  let component: AuthoritativeRegionComponent;
  let fixture: ComponentFixture<AuthoritativeRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoritativeRegionComponent ]
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
