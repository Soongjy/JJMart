import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product !: Product;

  cartItems: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(product: Product){
    this.cartItems.push(product);
    console.log(product + " has been added!")
  }

}
