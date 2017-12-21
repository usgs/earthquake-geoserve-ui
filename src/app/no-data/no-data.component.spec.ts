import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { NoDataComponent } from './no-data.component';

describe('NoDataComponent', () => {
  let component: NoDataComponent;
  let fixture: ComponentFixture<NoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataComponent ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
