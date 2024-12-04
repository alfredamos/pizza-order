import { Component, inject, input, OnInit, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pizza-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pizza-form.component.html',
  styleUrl: './pizza-form.component.css',
})
export class PizzaFormComponent implements OnInit {
  formName = input.required<string>();
  pizza = input.required<Pizza>();

  fb = inject(FormBuilder);

  pizzaForm = this.fb.group({
    name: ['', [Validators.required]],
    quantity: [0, [Validators.required]],
    price: [0, [Validators.required]],
    image: ['', [Validators.required]],
    topping: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.pizzaForm.patchValue({
      name: this.pizza()?.name,
      quantity: this.pizza()?.quantity,
      price: this.pizza()?.price,
      description: this.pizza()?.description,
      image: this.pizza()?.image,
      topping: this.pizza()?.topping,
    });
  }

  onBackToList = output<void>();
  onEdit = output<Pizza>();

  backToList() {
    this.onBackToList.emit();
  }

  editPizza() {
    this.onEdit.emit(this.pizzaForm.value as Pizza);
  }
}
