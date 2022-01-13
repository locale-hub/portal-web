import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GetKeyHistoryComponent} from './get-key-history.component';

describe('GetKeyHistoryComponent', () => {
  let component: GetKeyHistoryComponent;
  let fixture: ComponentFixture<GetKeyHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GetKeyHistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetKeyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
