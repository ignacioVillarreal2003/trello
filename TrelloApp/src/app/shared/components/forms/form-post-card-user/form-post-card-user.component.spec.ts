import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostCardUserComponent } from './form-post-card-user.component';

describe('FormPostCardUserComponent', () => {
  let component: FormPostCardUserComponent;
  let fixture: ComponentFixture<FormPostCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPostCardUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
