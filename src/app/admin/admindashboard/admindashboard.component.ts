import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Category';
import { Order } from 'src/app/Order';
import { Product } from 'src/app/Product';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  orders: Order[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  users: User[] = [];
  totalRevenue!:number;
  todaysRevenue!:number;


  constructor(private orderService: OrderService, private productService: ProductService, private userService:UserService,
    private categoryService: CategoryService, private router:Router) { }

  ngOnInit(): void {
    this.getTotalPendingOrder();
    this.getTotalProducts();
    this.getTotalCategories();
    this.getTotalUsers();
    this.getTotalRevenue();
    this.getTodaysRevenue();
  }

  getTotalPendingOrder(){
    this.orderService.getOrders().subscribe(
      (orders)=>{
        this.orders = orders.filter(order=>(order.status=="Pending"))
      }
    );
  }

  getTotalRevenue(){
    this.totalRevenue = 0;
    var month =new Date().getMonth();
    this.orderService.getOrders().subscribe(
      (orders)=>{
        for(let i=0; i<orders.length; i++){
          var date:Date = new Date(orders[i].orderDate)
          var orderMonth =date.getMonth();
          if(month === orderMonth){
          this.totalRevenue +=orders[i].totalPrice;
          }
        }
      }
    );
  }

  getTodaysRevenue(){
    this.todaysRevenue = 0;
    var today =new Date();
    this.orderService.getOrders().subscribe(
      (orders)=>{
        for(let i=0; i<orders.length; i++){
          var date:Date = new Date(orders[i].orderDate)
          if(date.toLocaleDateString()== today.toLocaleDateString()){
            this.todaysRevenue +=orders[i].totalPrice
          }
        }
      }
    );
  }



  getTotalProducts(){
    this.productService.getProducts().subscribe(
      (products)=>{
        this.products = products
      }
    );
  }

  getTotalCategories(){
    this.categoryService.getCategories().subscribe(
      (categories)=>{
        this.categories = categories;
      }
    );
  }

  getTotalUsers(){
    this.userService.getUsers().subscribe(
      (users)=>{
        this.users = users;
      }
    );
  }
}
