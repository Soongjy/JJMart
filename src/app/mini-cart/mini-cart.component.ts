import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css']
})
export class MiniCartComponent implements OnInit {

  cartItems: Product[] = [];
  grandTotal: number = 0;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService.getProducts().subscribe((items)=>{
      this.cartItems = items;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

}
