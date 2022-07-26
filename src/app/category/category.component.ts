import { CartService } from './../services/cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { Image } from '../Image';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  products : Product[] = [];
  categoryProducts : Product[] = [];
  categoryName !:string;
  images:Image[]=[];

  testing: string = "HAPPY"

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private cartService: CartService,
    private imageService: ImageService) { }

  ngOnInit(): void {
    console.log(this.testing.toLocaleLowerCase())
    this.imageService.getImages().subscribe((images)=>{
      for(var image of images){
        if (image.page=='Category Banner'){
          this.images.push(image)
        }
      }
    })

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
        if(products[i].visibility==true)
          if((this.products[i].category?.toLocaleLowerCase())==categoryName)
            this.categoryProducts.push(this.products[i]);
      }
    });
  }

  addToCart(product: Product){

  }

}
