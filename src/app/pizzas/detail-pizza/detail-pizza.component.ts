import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { PizzaDbService } from '../../services/pizzaDb.service';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { AddPizzaItemComponent } from '../add-pizza-item/add-pizza-item.component';

@Component({
  selector: 'app-detail-pizza',
  imports: [AddPizzaItemComponent, RouterLink],
  templateUrl: './detail-pizza.component.html',
  styleUrl: './detail-pizza.component.css'
})
export class DetailPizzaComponent implements OnInit{
  //----> Injected services.
cartItemStoreService = inject(CartItemStoreService);
  pizzaDbService = inject(PizzaDbService);
  pizzaStoreService = inject(PizzaStoreService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cartUtilService = inject(CartUtilService);

  //----> Computed values
  pizza = this.pizzaStoreService.pizza;
  cartItems = this.cartItemStoreService?.cartItems;

  isAddToCart = this.cartItemStoreService?.isAddToCart;


  ngOnInit(): void {
    this.loadPizza();
  }

  async loadPizza() {
    const pizzaId = this.route.snapshot.params['id'];
    console.log("pizzaId : ", pizzaId);
    const detailedPizza = await this.pizzaDbService.getOneResource(pizzaId)
    this.pizzaStoreService.updatePizza(detailedPizza);
  }

  addToCart(pizza: Pizza) {
      console.log('Add to cart');
      this.cartItemStoreService.changeIsAddToCart(true);
      //this.cartUtilService.
      this.cartUtilService.makeCartItems(pizza, this.cartItems());
    }

    backToList() {
      console.log('You must close now!!!');
      this.cartItemStoreService.changeIsAddToCart(false);
    }

    toCart(carts: CartItem[]) {
      console.log('The cart-items to cart : ', { carts });

      const newCartItems = carts?.filter((cart) => cart?.quantity !== 0);

      this.cartItemStoreService.editAllCatItems(newCartItems);
      this.cartItemStoreService.setLocalStorageCartItems(newCartItems);

      console.log({ carts });

      this.cartItemStoreService.changeIsAddToCart(false);

      this.router.navigateByUrl('/orders/cart');
    }
}
