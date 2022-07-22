import { Component, OnInit } from '@angular/core';
import { AnyTxtRecord } from 'dns';
import { Order } from '../Order';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];
  grandTotal: number = 0;
  totalItemPrice: number = 0;


  orders: Order[] = [];

  userdetails: any;
  name:string ='';
  address:string='';

  cartDetails: any;

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {

    this.userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    for (let x in this.userdetails) {
      if (x == "name"){
        this.name = this.userdetails[x];
      }
    }

    this.getCartItems();
  }

  addFunction(product: Product){
    this.cartService.addFunction(product);
  }

  minusFunction(product: Product){
    this.cartService.minusFunction(product);
  }

  getCartItems(){
    this.cartService.getProducts().subscribe((items)=>{
      this.cartItems = items;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  deleteCartItem(product: Product){
    this.cartService.deleteCartItem(product);
  }

  createOrder(){
    const newOrder = {
      orderDate: new Date (),
      totalPrice: this.grandTotal,
      products: this.cartItems,
      name: this.name,
      address: this.address,
      status: "Processing"
    };

    this.orderService.addOrder(newOrder).subscribe((order:Order)=>(this.orders.push(order)));
    //this.cartService.clearCart();
    setTimeout(() => {
      window.location.href = ("/orderconfirmation");
    }, 1000);

  }

}
