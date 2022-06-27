import { CartService } from './../services/cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products : Product[] = [];
  categoryProducts : Product[] = [];
  categoryName !:string;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {


    this.route.params.subscribe(routeParams => {
      this.categoryProducts = [];
      this.categoryName = this.route.snapshot.paramMap.get('params') as string;
      this.getProductsByCategory();
    });
  }

  getProductsByCategory(){

    const categoryName = this.route.snapshot.paramMap.get('params');
    console.log("Category: " + categoryName);

    this.productService.getProducts().subscribe((products)=>{
      this.products = products;
      for(var i=0; i<this.products.length; i++){
        if(this.products[i].category.toLocaleLowerCase()==categoryName)
          this.categoryProducts.push(this.products[i]);
      }
    });
  }

  addToCart(product: Product){

  }

}
