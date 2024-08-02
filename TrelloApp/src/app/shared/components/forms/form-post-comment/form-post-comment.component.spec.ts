import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostCommentComponent } from './form-post-comment.component';

describe('FormPostCommentComponent', () => {
  let component: FormPostCommentComponent;
  let fixture: ComponentFixture<FormPostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPostCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
