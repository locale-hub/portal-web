import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AddLocaleComponent} from './add-locale.component';

describe('AddLocaleComponent', () => {
  let component: AddLocaleComponent;
  let fixture: ComponentFixture<AddLocaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
