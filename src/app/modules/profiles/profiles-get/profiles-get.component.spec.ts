import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesGetComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfilesGetComponent;
  let fixture: ComponentFixture<ProfilesGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
