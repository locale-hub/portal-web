import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganizationsUsersComponent } from './organizations-users.component';

describe('OrganizationsUsersComponent', () => {
  let component: OrganizationsUsersComponent;
  let fixture: ComponentFixture<OrganizationsUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
