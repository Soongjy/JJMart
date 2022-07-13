import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import { Product } from '../Product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: Product[] = [];
  featProducts: Product[] = [];
  categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories)=>{
      for(var i=0; i<categories.length; i++){
        if(categories[i].visibility==true)
          this.categories.push(categories[i])}
    })
  }

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
