import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cart';
  
  cartItems: Product[] = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() { }

  deleteCartItem(product: Product){
    const item = this.cartItems.find(item=> item.id === product.id);
    this.cartItems.splice(this.cartItems.indexOf(item as Product), 1);
    this.productList.next(this.cartItems);
  }

  getProducts(){
    return this.productList.asObservable();
  }

  addToCart(product:any){
    
    let productExists = false;
    
    for(let i in this.cartItems){
      if(this.cartItems[i].id === product.id){
        this.cartItems[i].quantity ++;
        productExists = true;
        break;
      }
    }

    if(!productExists){
      this.cartItems.push(product);
    }

    this.productList.next(this.cartItems);
  }

  getTotalPrice():number{
    let grandTotal = 0;
    this.cartItems.map((product: Product)=>{
      grandTotal += product.price * product.quantity;
    })
    return grandTotal;
  }

  addFunction(product: Product){
    product.quantity = product.quantity+1;
    this.productList.next(this.cartItems);
  }

  minusFunction(product: Product){
    if(product.quantity>1)
      product.quantity = product.quantity-1;
    else if(product.quantity>=0)
      this.deleteCartItem(product);
      this.productList.next(this.cartItems);
  }

  clearCart(){
    this.cartItems = [];
    this.productList.next(this.cartItems);
  }



}
