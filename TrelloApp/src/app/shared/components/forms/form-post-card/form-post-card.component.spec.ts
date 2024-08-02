import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostCardComponent } from './form-post-card.component';

describe('FormPostCardComponent', () => {
  let component: FormPostCardComponent;
  let fixture: ComponentFixture<FormPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPostCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
