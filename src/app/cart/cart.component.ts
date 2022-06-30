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
  grandTotal: number = 0;
  totalItemPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
    //this.totalPriceFunction();
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
    this.cartService.getProducts().subscribe((items)=>{
      this.cartItems = items;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  deleteCartItem(product: Product){
    this.cartService.deleteCartItem(product);
   // this.totalPriceFunction();
  }

 
  // totalPriceFunction(){
  //   var total= 0;
  //   for(var i = 0; i<this.cartItems.length; i++){
  //     total += this.cartItems[i].price;
  //   }
  //   this.totalPrice = total;
  // }

}
