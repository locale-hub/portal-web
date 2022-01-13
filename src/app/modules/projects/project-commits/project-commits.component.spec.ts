import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProjectCommitsComponent} from './project-commits.component';

describe('ProjectCommitsComponent', () => {
  let component: ProjectCommitsComponent;
  let fixture: ComponentFixture<ProjectCommitsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCommitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
