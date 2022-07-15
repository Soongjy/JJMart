import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import { Product } from '../Product';
import { Banner } from '../Banner';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { BannerService } from '../services/banner.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: Product[] = [];
  featProducts: Product[] = [];
  categories: Category[] = [];
  banners:Banner[]=[];
  firstBanner:Banner[]=[];

  constructor(private productService: ProductService, private categoryService: CategoryService, private bannerService:BannerService) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
    this.getCategories();
    this.getBanners();
  }

  getBanners(){
    this.bannerService.getBanners().subscribe((banners)=>{
      for(var banner of banners){
        if (banner.page=='Homepage'){
          if (this.firstBanner.length===0){
            this.firstBanner.push(banner)
          }else{
            this.banners.push(banner)
          }
        }
      }
    })
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
