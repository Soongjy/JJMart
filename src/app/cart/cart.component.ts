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


}
