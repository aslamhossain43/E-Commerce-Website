import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCheckoutComponent } from './manage-checkout.component';

describe('ManageCheckoutComponent', () => {
  let component: ManageCheckoutComponent;
  let fixture: ComponentFixture<ManageCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
