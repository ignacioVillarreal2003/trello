import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostTeamComponent } from './form-post-team.component';

describe('FormPostTeamComponent', () => {
  let component: FormPostTeamComponent;
  let fixture: ComponentFixture<FormPostTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPostTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPostTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
