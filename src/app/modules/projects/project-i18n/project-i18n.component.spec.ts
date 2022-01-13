import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProjectI18nComponent} from './project-i18n.component';

describe('ProjectI18nComponent', () => {
  let component: ProjectI18nComponent;
  let fixture: ComponentFixture<ProjectI18nComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectI18nComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectI18nComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
