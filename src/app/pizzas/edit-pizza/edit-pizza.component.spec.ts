import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPizzaComponent } from './edit-pizza.component';

describe('EditPizzaComponent', () => {
  let component: EditPizzaComponent;
  let fixture: ComponentFixture<EditPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPizzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
