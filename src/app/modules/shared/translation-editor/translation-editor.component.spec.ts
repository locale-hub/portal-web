import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationEditorComponent } from './translation-editor.component';

describe('TranslationEditorComponent', () => {
  let component: TranslationEditorComponent;
  let fixture: ComponentFixture<TranslationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
