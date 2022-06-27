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

  addFunction(){
    var quantity = document.getElementById("quantityValue") as HTMLInputElement;
    var total = document.getElementById("total")!.innerHTML;
    var qty = Number(quantity.value) +1;
    quantity.value = qty.toString();
    var total1 = Number(total) * qty;
    console.log(quantity.value);
    console.log(total1);
  }

  minusFunction(){
    var quantity = document.getElementById("quantityValue") as HTMLInputElement;
    var qty:number = 1;
    if(Number(quantity.value)>1){
      qty = Number(quantity.value)-1;
    }
    else{
      qty=1;
    }
    quantity.value = qty.toString();
    console.log(quantity.value);
  }

  getCartItems(){
    this.cartItems = this.cartService.getCartItems();
  }

  deleteCartItem(product: Product){
    this.cartService.deleteCartItem(product);
  }

}
