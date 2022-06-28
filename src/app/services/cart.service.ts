import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cart';
  
  cartItems: Product[] = [];
  cartItemCounter:number = 0;
  //private cartCount = new Subject<number>();

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

  // getCartItems2(): Observable<Product[]>{
  //   return of(this.cartItems);
  // }

  // getCartCount(): Observable<number> {
  //   return this.cartCount.asObservable();
  // }

  // setCartCount(item: any) {
  //   this.cartCount.next(this.getCartItems().length);
  //   console.log("length: " + this.getCartItems().length);
  // }
  private cartCount = new ReplaySubject<number>(1);
  cartCount$ = this.cartCount.asObservable();
  setCartCount(count: number) {
    // encapsulate with logic to set local storage
    localStorage.setItem("cart_count", JSON.stringify(count));
    this.cartCount.next(count);
  }

}
