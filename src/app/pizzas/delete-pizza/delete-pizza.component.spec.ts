import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePizzaComponent } from './delete-pizza.component';

describe('DeletePizzaComponent', () => {
  let component: DeletePizzaComponent;
  let fixture: ComponentFixture<DeletePizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePizzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
