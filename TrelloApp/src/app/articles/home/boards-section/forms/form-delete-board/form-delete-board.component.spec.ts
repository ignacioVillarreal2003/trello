import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteBoardComponent } from './form-delete-board.component';

describe('FormDeleteBoardComponent', () => {
  let component: FormDeleteBoardComponent;
  let fixture: ComponentFixture<FormDeleteBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDeleteBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDeleteBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
