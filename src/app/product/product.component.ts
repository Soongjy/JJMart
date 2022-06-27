import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product !: Product;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product){
   
    this.cartService.addToCart(product);

    // localStorage.setItem('dataSource', JSON.stringify(this.cartItems));
    // var retrievedObject = JSON.parse(localStorage.getItem('dataSource')!);
    // console.log(product.name + " has been added!")
    // console.log('retrievedObject: ', retrievedObject);
  }

}
