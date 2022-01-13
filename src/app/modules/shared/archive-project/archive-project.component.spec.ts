import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArchiveProjectComponent} from './archive-project.component';

describe('ArchiveProjectComponent', () => {
  let component: ArchiveProjectComponent;
  let fixture: ComponentFixture<ArchiveProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
