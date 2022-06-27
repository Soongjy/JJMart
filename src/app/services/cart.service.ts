import { Injectable } from '@angular/core';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cart';
  
  cartItems: Product[] = [];

  constructor() { }

  addToCart(product: Product){
   
    this.cartItems.push(product);
    console.log(this.cartItems)
  }

  getCartItems(){
    return this.cartItems;
  }

  deleteCartItem(product: Product){
    const item = this.cartItems.find(item=> item.id === product.id);
    this.cartItems.splice(this.cartItems.indexOf(item as Product), 1)
    console.log('deleted' + product.name);
  }
}
