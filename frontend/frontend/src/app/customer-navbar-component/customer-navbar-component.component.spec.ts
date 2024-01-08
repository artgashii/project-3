import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNavbarComponentComponent } from './customer-navbar-component.component';

describe('CustomerNavbarComponentComponent', () => {
  let component: CustomerNavbarComponentComponent;
  let fixture: ComponentFixture<CustomerNavbarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerNavbarComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerNavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
