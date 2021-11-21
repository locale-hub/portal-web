import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteOrganizationComponent } from './delete-organization.component';

describe('DeleteOrganizationComponent', () => {
  let component: DeleteOrganizationComponent;
  let fixture: ComponentFixture<DeleteOrganizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
