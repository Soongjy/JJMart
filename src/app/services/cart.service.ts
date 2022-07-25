import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Cart } from '../Cart';
import { Product } from '../Product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carts';

  cartItems: Product[] = [];
  cartData: Product[] = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
    //this.syncItems();
    this.cartData = JSON.parse(localStorage.getItem('cartData') || '[]');
  }

  // updateCart(cart:Cart):Observable<Cart>{
  //   const url = `${this.apiUrl}/${cart.id}`;
  //   return this.http.put<Cart>(url,cart,httpOptions);
  // }

  newCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart, httpOptions);
  }

  // getCart(cart:Cart): Observable<Cart> {
  //   const url = `${this.apiUrl}/${cart.id}`;
  //   return this.http.get<Cart>(url);
  // }

  // getCarts(): Observable<Cart[]>{
  //   return this.http.get<Cart[]>(this.apiUrl);
  // }

  deleteCartItem(product: Product) {
    const item = this.cartData.find((item) => item.id === product.id);
    this.cartData.splice(this.cartData.indexOf(item as Product), 1);
    this.productList.next(this.cartData);
    this.syncItems();
    setTimeout(() => {
      window.location.href = ("/viewcart");
    }, 1000);

    
  }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: any) {
    // let productExists = false;

    // for(let i in this.cartItems){
    //   if(this.cartItems[i].id === product.id){
    //     this.cartItems[i].quantity ++;
    //     productExists = true;
    //     break;
    //   }
    // }

    // if(!productExists){
    //   this.cartItems.push(product);
    // }

    // this.productList.next(this.cartItems);

    let productExists = false;

    for (let i in this.cartData) {
      if (this.cartData[i].id === product.id) {
        this.cartData[i].quantity++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartData.push(product);
    }

    this.productList.next(this.cartData);

    this.syncItems();
  }

  getTotalPrice(): number {
    // let grandTotal = 0;
    // this.cartItems.map((product: Product)=>{
    //   grandTotal += product.price * product.quantity;
    // })
    // return grandTotal;

    let grandTotal = 0;
    this.cartData.map((product: Product) => {
      grandTotal += product.price * product.quantity;
    });

    return grandTotal;
  }

  addFunction(product: Product) {
    for (let i in this.cartData) {
      if (this.cartData[i].id === product.id) {
        product.quantity = product.quantity + 1;
        this.cartData[i].quantity++;
      }
    }
    this.productList.next(this.cartData);
    this.syncItems();
  }

  minusFunction(product: Product) {
    for (let i in this.cartData) {
      if (this.cartData[i].id === product.id) {
        if (product.quantity > 1) {
          product.quantity = product.quantity - 1;
          this.cartData[i].quantity--;
        }
        else if(product.quantity >= 0) {
          this.deleteCartItem(product);
        }
      }
    }

    this.productList.next(this.cartData);
    this.syncItems();
  }

  clearCart() {
    this.cartItems = [];
    this.productList.next(this.cartItems);
  }
  
  getCount(){
    return this.cartData.length;
    
  }

  syncItems() {
    localStorage.setItem('cartData', JSON.stringify(this.cartData)); // sync the data
    localStorage.setItem('counter', this.cartData.length.toString());
  }
}
