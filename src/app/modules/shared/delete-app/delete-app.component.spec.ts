import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeleteAppComponent} from './delete-app.component';

describe('DeleteAppComponent', () => {
  let component: DeleteAppComponent;
  let fixture: ComponentFixture<DeleteAppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
