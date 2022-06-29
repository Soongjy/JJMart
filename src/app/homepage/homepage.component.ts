import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: Product[] = [];
  featProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  // getProducts(){
  //   this.productService.getProducts().subscribe((products)=>{
  //     this.products = products;
  //   });
  // }

  getFeaturedProducts(){
    this.productService.getProducts().subscribe((products)=>{
      this.products = products;
      for(var i=0; i<this.products.length; i++){
        if(this.products[i].discountedPrice!==null && this.featProducts.length<4)
          this.featProducts.push(this.products[i]);
      }
    });

  }

  scroll(){
    (document.getElementById('fav')as HTMLElement).scrollIntoView({
      behavior: 'smooth'
    });

    console.log("clicked");

  }

}
