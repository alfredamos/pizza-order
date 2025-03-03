import { Component, inject, OnInit, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { AddPizzaItemComponent } from '../add-pizza-item/add-pizza-item.component';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { Router, RouterLink } from '@angular/router';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';
import { PizzaDbService } from '../../services/pizzaDb.service';

@Component({
  selector: 'app-list-pizza',
  imports: [RouterLink, AddPizzaItemComponent],
  templateUrl: './list-pizza.component.html',
  styleUrl: './list-pizza.component.css',
})
export class ListPizzaComponent implements OnInit {
  //----> State.
  isShowMore = signal(false);

  //----> Injected services.
  cartItemStoreService = inject(CartItemStoreService);
  pizzaDbService = inject(PizzaDbService);
  pizzaStoreService = inject(PizzaStoreService);

  router = inject(Router);
  cartUtilService = inject(CartUtilService);

  //----> Computed
  pizzas = this.pizzaStoreService.pizzas;

  cartItems = this.cartItemStoreService?.cartItems;

  isAddToCart = this.cartItemStoreService?.isAddToCart;

  //----> Life cycle.
  ngOnInit(): void {
    this.loadPizza();
  }

  //----> Actions
  async loadPizza() {
    const pizzas = await this.pizzaDbService.getAllResources();
    this.pizzaStoreService.editAllPizzas(pizzas);
  }

  detailPizza(pizza: Pizza){
    this.pizzaStoreService.updatePizza(pizza)
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

  showMoreText(pizzaId: string){
    console.log("Pizza-id : ", pizzaId)
    this.pizzas()?.forEach(pizza =>  {
        if(pizza.id === pizzaId){
          console.log("loop-id : ", pizza.id , " , ", "given-id : ", pizzaId)
          this.isShowMore.set(!this.isShowMore())
        }
    })

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
