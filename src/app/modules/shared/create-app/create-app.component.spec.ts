import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CreateAppComponent} from './create-app.component';

describe('CreateAppComponent', () => {
  let component: CreateAppComponent;
  let fixture: ComponentFixture<CreateAppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAppComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
