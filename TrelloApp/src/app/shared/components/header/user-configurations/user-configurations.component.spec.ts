import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigurationsComponent } from './user-configurations.component';

describe('UserConfigurationsComponent', () => {
  let component: UserConfigurationsComponent;
  let fixture: ComponentFixture<UserConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserConfigurationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
