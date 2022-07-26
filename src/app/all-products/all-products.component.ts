import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: Product[] = [];

  productSub : Subscription = new Subscription();

  productCount!: number;
  

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
 
    this.route.params.subscribe(params=>{
      if(params.searchTerm){
       this.productSub = this.productService.getProducts().subscribe((products)=>{
        this.products = products.filter( product =>
          (product.name.toLocaleLowerCase().includes(params.searchTerm.toLocaleLowerCase())
          || product.category?.toLocaleLowerCase().includes(params.searchTerm.toLocaleLowerCase())));
          this.productCount = this.products.length;
      });
      }
    
    })
  }

//   getProducts(){
//   this.productService.getProducts().subscribe((products)=>{
//     this.products = products;
//     console.log(this.products);
//   });
// }

}
