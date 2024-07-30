import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputTextComponent } from './generic-input-text.component';

describe('GenericInputTextComponent', () => {
  let component: GenericInputTextComponent;
  let fixture: ComponentFixture<GenericInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericInputTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
