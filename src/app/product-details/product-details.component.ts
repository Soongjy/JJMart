import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDetails();
  }
  
  getDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
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
  }

  addToCart(product: Product){

    this.cartService.addToCart(product);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(this.product.name + " added to cart!", action, {
      duration: 2000
    });
  }

}
