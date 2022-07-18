import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import { Product } from '../Product';
import { Image } from '../Image';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ImageService } from '../services/image.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: Product[] = [];
  featProducts: Product[] = [];
  categories: Category[] = [];
  images:Image[]=[];
  firstImage:Image[]=[];

  constructor(private productService: ProductService, private categoryService: CategoryService, private imageService:ImageService) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
    this.getCategories();
    this.getImages();
  }

  getImages(){
    this.imageService.getImages().subscribe((images)=>{
      for(var image of images){
        if (image.page=='Homepage'){
          if (this.firstImage.length===0){
            this.firstImage.push(image)
          }else{
            this.images.push(image)
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
