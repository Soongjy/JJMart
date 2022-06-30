import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product !: Product;
  
  constructor(private cartService: CartService, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(this.product.name + " added to cart!", action, {
      duration: 2000
    });
  }

  ngOnInit(): void {
  }

  addToCart(product: Product){
   
    this.cartService.addToCart(product);
  }

}
