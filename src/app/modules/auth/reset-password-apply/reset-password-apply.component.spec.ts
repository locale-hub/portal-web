import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ResetPasswordApplyComponent} from './reset-password-apply.component';

describe('ResetPasswordApplyComponent', () => {
  let component: ResetPasswordApplyComponent;
  let fixture: ComponentFixture<ResetPasswordApplyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordApplyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
