import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  favoriteSeason !: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
  this.productService.getProducts().subscribe((products)=>{
    this.products = products;
  });
}

}
