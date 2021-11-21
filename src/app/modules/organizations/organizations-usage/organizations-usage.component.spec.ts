import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsUsageComponent } from './organizations-usage.component';

describe('OrganizationsUsageComponent', () => {
  let component: OrganizationsUsageComponent;
  let fixture: ComponentFixture<OrganizationsUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationsUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
