import { Component, OnInit} from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Category } from 'src/app/Category';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/Order';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit{
  constructor(private categoryService:CategoryService, private orderService:OrderService) { }
  doughnutChartLabels: string[]=[];
  doughnutChartData!: ChartData<'doughnut'>
  data:number[]=[];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.orderService.getOrders().subscribe((orders) => {
        for (var c = 0; c < categories.length; c++){
          this.doughnutChartLabels.push(categories[c].name);
          var categoryTotal = 0;
          console.log(categoryTotal+1)
          for (var o = 0; o < orders.length; o++) {
            if(orders[o].status == 'Approved'){
              for(var p = 0; p < orders[o].products.length; p++ ){
                  if(orders[o].products[p].category == categories[c].name){
                    var productTotal = 0
                    if(orders[o].products[p].discountedPrice == 0){
                      productTotal = orders[o].products[p].price * orders[o].products[p].quantity
                    }else{
                      productTotal = orders[o].products[p].discountedPrice * orders[o].products[p].quantity
                    }
                    categoryTotal = categoryTotal + productTotal
                  }
              }
            }
          }
          this.data.push(categoryTotal);
        }
        
        this.doughnutChartData = {
          labels: this.doughnutChartLabels,
          datasets: [
            {data: this.data}
          ]
        };
      });
    })
  };


  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  getCategories() {
    
  }

  piechartdropdowntoggle(){
    document.getElementById("pie-chart-dropdown")!.classList.toggle('show');
  }
}
