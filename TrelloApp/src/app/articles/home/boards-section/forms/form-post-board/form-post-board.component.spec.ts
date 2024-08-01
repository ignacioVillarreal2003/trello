import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostBoardComponent } from './form-post-board.component';

describe('FormPostBoardComponent', () => {
  let component: FormPostBoardComponent;
  let fixture: ComponentFixture<FormPostBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPostBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
