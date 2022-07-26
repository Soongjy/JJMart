import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-quantity',
  templateUrl: './cart-quantity.component.html',
  styleUrls: ['./cart-quantity.component.css']
})
export class CartQuantityComponent implements OnInit {

  cartItems: Product[] = [];
  grandTotal: number = 0;
  totalItemPrice: number = 0;
  @Input() cartItem!: Product;
  

  cartData: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  addFunction(product: Product){

    this.cartService.addFunction(product);
  }

  minusFunction(product: Product){
    this.cartService.minusFunction(product);
  }

  getCartItems(){
    this.cartService.getProducts().subscribe((items)=>{
      this.cartData = items;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

}
