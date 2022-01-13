import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PublishCommitComponent} from './publish-commit.component';

describe('PublishCommitComponent', () => {
  let component: PublishCommitComponent;
  let fixture: ComponentFixture<PublishCommitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PublishCommitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
