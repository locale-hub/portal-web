import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProjectCommitsDetailsComponent} from './project-commits-details.component';

describe('ProjectCommitsDetailsComponent', () => {
  let component: ProjectCommitsDetailsComponent;
  let fixture: ComponentFixture<ProjectCommitsDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCommitsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCommitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
