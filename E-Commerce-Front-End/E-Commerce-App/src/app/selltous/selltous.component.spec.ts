import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelltousComponent } from './selltous.component';

describe('SelltousComponent', () => {
  let component: SelltousComponent;
  let fixture: ComponentFixture<SelltousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelltousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelltousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
