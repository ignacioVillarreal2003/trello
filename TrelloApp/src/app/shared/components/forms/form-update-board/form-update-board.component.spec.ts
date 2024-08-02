import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateBoardComponent } from './form-update-board.component';

describe('FormUpdateBoardComponent', () => {
  let component: FormUpdateBoardComponent;
  let fixture: ComponentFixture<FormUpdateBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
