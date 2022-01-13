import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProjectExportsComponent} from './project-exports.component';

describe('ProjectExportsComponent', () => {
  let component: ProjectExportsComponent;
  let fixture: ComponentFixture<ProjectExportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectExportsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
