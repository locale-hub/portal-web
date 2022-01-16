import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProfilesSettingsComponent} from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfilesSettingsComponent;
  let fixture: ComponentFixture<ProfilesSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
