import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrganizationsProjectsComponent} from './organizations-projects.component';

describe('DashboardComponent', () => {
  let component: OrganizationsProjectsComponent;
  let fixture: ComponentFixture<OrganizationsProjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsProjectsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
