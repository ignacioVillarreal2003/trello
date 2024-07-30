import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddFriendComponent } from './form-add-friend.component';

describe('FormAddFriendComponent', () => {
  let component: FormAddFriendComponent;
  let fixture: ComponentFixture<FormAddFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
