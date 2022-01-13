import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrganizationsSettingsComponent} from './organizations-settings.component';

describe('OrganizationsSettingsComponent', () => {
  let component: OrganizationsSettingsComponent;
  let fixture: ComponentFixture<OrganizationsSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
