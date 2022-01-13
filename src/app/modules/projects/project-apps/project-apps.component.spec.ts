import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProjectAppsComponent} from './project-apps.component';

describe('ProjectAppsComponent', () => {
  let component: ProjectAppsComponent;
  let fixture: ComponentFixture<ProjectAppsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
