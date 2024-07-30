import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSectionComponent } from './teams-section.component';

describe('TeamsSectionComponent', () => {
  let component: TeamsSectionComponent;
  let fixture: ComponentFixture<TeamsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
