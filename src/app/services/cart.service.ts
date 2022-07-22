import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Cart } from '../Cart';
import { Product } from '../Product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/carts';
  
  cartItems: Product[] = [];
  public productList = new BehaviorSubject<any>([]);
  
  constructor(private http:HttpClient) { }

  updateCart(cart:Cart):Observable<Cart>{
    const url = `${this.apiUrl}/${cart.id}`;
    return this.http.put<Cart>(url,cart,httpOptions);
  }

  newCart(cart:Cart):Observable<Cart>{
    return this.http.post<Cart>(this.apiUrl, cart, httpOptions);
  }

  getCart(cart:Cart): Observable<Cart> {
    const url = `${this.apiUrl}/${cart.id}`;
    return this.http.get<Cart>(url);
  }

  getCarts(): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.apiUrl);
  }

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
