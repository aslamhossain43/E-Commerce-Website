import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelltousDetailsComponent } from './selltous-details.component';

describe('SelltousDetailsComponent', () => {
  let component: SelltousDetailsComponent;
  let fixture: ComponentFixture<SelltousDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelltousDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelltousDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
