import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsSectionComponent } from './boards-section.component';

describe('BoardsSectionComponent', () => {
  let component: BoardsSectionComponent;
  let fixture: ComponentFixture<BoardsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
