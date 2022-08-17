import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from 'src/app/services/order.service';

import {default as Annotation} from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})

export class MyLineChartComponent implements OnInit{
  linecharttitle = "Daily Earning Overview"
  data:number[]=[]
  lineChartData!: ChartConfiguration['data']
  label:string[]=[]
  monthlydata:number[]=[]

  constructor(private orderService: OrderService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.getDailyRevenue()
  }
  

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }


  public changeColor(): void {
    if(this.lineChartData.datasets[0].borderColor != 'green'){
      this.lineChartData.datasets[0].borderColor = 'green';
      this.lineChartData.datasets[0].backgroundColor = `rgba(0, 255, 0, 0.3)`;
      this.chart?.update();
    }else{
      this.lineChartData.datasets[0].borderColor = 'blue';
      this.lineChartData.datasets[0].backgroundColor = `rgba(137,196,244,0.2)`;
      this.chart?.update();
    }
  }

  chartdropdowntoggle(){
    document.getElementById("line-chart-dropdown")!.classList.toggle('show');
  }

  getMonthlyRevenue(){
    this.orderService.getOrders().subscribe(
      (orders)=>{
        var now:Date = new Date();
        var thisYear = now.getFullYear();
        for(let array=0; array<12; array++){
          var monthlyRevenue = 0;
          for(let i=0; i<orders.length; i++){
            var date:Date = new Date(orders[i].orderDate)
            var orderMonth =date.getMonth();
            var orderYear = date.getFullYear();
            if(array == orderMonth && thisYear == orderYear && orders[i].status == "Approved"){
              monthlyRevenue = monthlyRevenue + orders[i].totalPrice
            }
          }
          this.monthlydata.push(monthlyRevenue);
        }
        this.lineChartData= {
          datasets: [
            {
              data: this.monthlydata,
              label: 'Monthly Revenue',
              backgroundColor: 'rgba(0, 255, 0, 0.3)',
              borderColor: 'green',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
              fill: 'origin',
            },
          ],
          labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November','December']
        };
        this.linecharttitle = new Date().getFullYear() + " Monthly Earning Overview"
      }
    );
  }

  getDailyRevenue(){
    this.orderService.getOrders().subscribe(
      (orders)=>{
        var now:Date = new Date();
        var thisMonth = now.getMonth();
        var today = now.getDate();
        var thisYear = now.getFullYear();
        for(let array=1; array<=today; array++){
          var dailyRevenue = 0;
          for(let i=0; i<orders.length; i++){
            var date:Date = new Date(orders[i].orderDate)
            var orderMonth =date.getMonth();
            var orderDate =date.getDate();
            var orderYear = date.getFullYear();
            if(thisMonth == orderMonth && array == orderDate && thisYear == orderYear && orders[i].status == "Approved"){
              dailyRevenue = dailyRevenue + orders[i].totalPrice
            }
          }
          this.data.push(dailyRevenue);
          this.label[array-1]=array.toString()
        }
        this.lineChartData= {
          datasets: [
            {
              data: this.data,
              label: 'Daily Revenue',
              backgroundColor: 'rgba(137,196,244,0.2)',
              borderColor: 'blue',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
              fill: 'origin',
            },
          ],
          labels: this.label
        };
        this.linecharttitle = "This Month Daily Earning Overview"
      }
    );
  }
}
