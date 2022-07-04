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

  userdetails: any;
  name:string ='';

  constructor(private cartService: CartService, private _snackBar: MatSnackBar) { }

  openSnackBarAddCart(message: string, action: string) {
    this._snackBar.open(this.product.name + " added to cart!", action, {
      duration: 2000
    });
  }

  openSnackBarSignIn(message: string, action: string) {
    this._snackBar.open("Please sign in first!", action, {
      duration: 2000
    });
  }

  ngOnInit(): void {

    this.userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
  
    if (this.userdetails == null) {
      console.log("Please sign in first")
    }
    else{
      console.log("user logged in")
    }
  }

  addToCart(product: Product){

    this.cartService.addToCart(product);
  }

}
