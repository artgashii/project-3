import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavbarComponentComponent } from './admin-navbar-component.component';

describe('AdminNavbarComponentComponent', () => {
  let component: AdminNavbarComponentComponent;
  let fixture: ComponentFixture<AdminNavbarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavbarComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
