import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateCommitComponent } from './create-commit.component';

describe('CreateCommitComponent', () => {
  let component: CreateCommitComponent;
  let fixture: ComponentFixture<CreateCommitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
