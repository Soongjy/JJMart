import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product !: Product;
  products : Product[] = [];
  categoryProducts : Product[] = [];
  productId!:number;

  userdetails: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    this.getDetails();
  }
  
  getDetails(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));

    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.productId = Number(params.get('id'));

      this.productService.getProduct(this.productId)
      .subscribe(product => {
        this.product = product;
        var categoryName = this.product.category;
        var productName = this.product.name;
        this.productService.getProducts().subscribe((products)=>{
          this.products = products;
          for(var i=0; i<this.products.length; i++){
            if(this.products[i].category==categoryName){
              if(this.products[i].name != productName && this.categoryProducts.length<4)
                this.categoryProducts.push(this.products[i]);
            }
          }
        });
      });

      this.categoryProducts = [];
    });
  }

  addToCart(product: Product){

    this.cartService.addToCartProductDetails(product);
  }

  add(product: Product){

    this.cartService.addProductDetails(product);
  }

  minus(product: Product){

    this.cartService.minusProductDetails(product);
  }

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
}
