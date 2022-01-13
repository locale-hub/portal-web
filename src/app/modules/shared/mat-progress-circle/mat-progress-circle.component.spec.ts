import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatProgressCircleComponent} from './mat-progress-circle.component';

describe('MatProgressCircleComponent', () => {
  let component: MatProgressCircleComponent;
  let fixture: ComponentFixture<MatProgressCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatProgressCircleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatProgressCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
