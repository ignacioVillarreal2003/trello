import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostLabelComponent } from './form-post-label.component';

describe('FormPostLabelComponent', () => {
  let component: FormPostLabelComponent;
  let fixture: ComponentFixture<FormPostLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPostLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
