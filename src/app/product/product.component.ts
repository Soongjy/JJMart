import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService, private _snackBar: MatSnackBar, private router: Router) { }

  openSnackBarAddCart(message: string, action: string) {
    this._snackBar.open(this.product.name + " added to cart!", action, {
      duration: 2000
    });
  }

  openSnackBarSignIn(message: string, action: string) {
    this._snackBar.open("Please sign in first!", action, {
      duration: 5000
    })
    .onAction()
    .subscribe(() => this.router.navigateByUrl('/signin'));
  }

  ngOnInit(): void {

    this.userdetails = JSON.parse(sessionStorage.getItem('userdetails')||"[]");
  
    if (this.userdetails == null) {
      console.log("Please sign in first")
    }
    else{
      console.log("user logged in")
    }
  }

  addToCart(product: Product){

    this.cartService.addToCart(product);
    this.ngOnInit();
  }

}


 // this.userdetails = JSON.parse(localStorage.getItem('userdetails') || '[]');
    // for (let x in this.userdetails) {
    //   if (x == 'username') {
    //     this.username = this.userdetails[x];
    //     console.log(this.username);
    //   }
    // }
    // this.cartService.getCarts().subscribe((carts) => {
    //   this.carts = carts;
    //   for (let i = 0; i < carts.length; i++) {
    //     if (carts[i].username == this.username){
    //       this.currentCart = carts[i];
    //     }
          
    //   }
    // });