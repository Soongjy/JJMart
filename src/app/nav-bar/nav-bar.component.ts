import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../services/category.service';
import { Category } from '../Category';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userdetails !: [];
  admindetails !:[];
  title: string = 'Sunway Mart';
  name!: string;
  privilege!: number;
  cartItemCounter: number = 0;
  categories: Category[] = [];

  mobile!: boolean;


  constructor(private cartService: CartService,private _snackBar: MatSnackBar, private categoryService: CategoryService) {
  
   }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    this.admindetails = JSON.parse(localStorage.getItem('admindetails')||"[]");
    if(!this.admindetails){
      for (let x in this.userdetails) {
        if (x == "name"){
          this.name = this.userdetails[x];
        }
      }
    }else{
      for (let x in this.admindetails) {
        if (x == "name"){
          this.name = this.admindetails[x];
        }
      }
    }

    //to update cart item count
    this.cartService.getProducts().subscribe((items)=>{
      this.cartItemCounter = items.length;
    })

    this.getCategories();

    //check screen size
    if (window.screen.width <= 360) { // 768px portrait
      this.mobile = true;
    }else{
      this.mobile = false;
    }

  }

  onLogout(){
    if(!confirm("Do you really want to Log Out?")) {
      return;
    }else{
    setTimeout(() => {
      localStorage.setItem('userdetails',JSON.stringify(null));
      localStorage.setItem('admindetails',JSON.stringify(null));
      window.location.href = "/";
    }, 500);
    
    }
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((categories)=>{
      this.categories = categories;
    })
  }

}
