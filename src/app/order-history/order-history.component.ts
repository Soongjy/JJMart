import { Component, OnInit } from '@angular/core';
import { Order } from '../Order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: Order[] = [];
  
  userdetails: any;
  name:string ='';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    for (let x in this.userdetails) {
      if (x == "name"){
        this.name = this.userdetails[x];
      }
    }

    this.getOrderHistory();
  }

  getOrderHistory(){
    this.orderService.getOrders().subscribe((orders)=>{
      for(var i = 0; i< orders.length; i++) {
        if(orders[i].name === this.name )
          this.orderHistoryList.push(orders[i]);
      }
    })

    console.log(this.orderHistoryList);
  }

}
