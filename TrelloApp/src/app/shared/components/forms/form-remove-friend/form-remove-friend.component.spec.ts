import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRemoveFriendComponent } from './form-remove-friend.component';

describe('FormRemoveFriendComponent', () => {
  let component: FormRemoveFriendComponent;
  let fixture: ComponentFixture<FormRemoveFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRemoveFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRemoveFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
