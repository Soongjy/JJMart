import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  addFunction(product: Product){
    product.quantity = product.quantity+1;
  }

  minusFunction(product: Product){
    if(product.quantity>1)
      product.quantity = product.quantity-1;
    else
      product.quantity=1;
  }

  getCartItems(){
    this.cartItems = this.cartService.getCartItems();
  }

  deleteCartItem(product: Product){
    this.cartService.deleteCartItem(product);
  }

}
