import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPreViewCardComponent } from './basic-pre-view-card.component';

describe('BasicPreViewCardComponent', () => {
  let component: BasicPreViewCardComponent;
  let fixture: ComponentFixture<BasicPreViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicPreViewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPreViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
