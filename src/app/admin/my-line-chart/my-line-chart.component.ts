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
  year = new Date().getFullYear()
  data:number[]=[]
  lineChartData!: ChartConfiguration['data']

  constructor(private orderService: OrderService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (orders)=>{
        for(let array=0; array<12; array++){
          var monthlyRevenue = 0;
          for(let i=0; i<orders.length; i++){
            var date:Date = new Date(orders[i].orderDate)
            var orderMonth =date.getMonth();
            if(array == orderMonth){
              monthlyRevenue = monthlyRevenue + orders[i].totalPrice
            }
          }
          this.data.push(monthlyRevenue);
        }
        this.lineChartData= {
          datasets: [
            {
              data: this.data,
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
      }
    );
  }
  // this.data[0],this.data[1],this.data[2],this.data[3],this.data[4],this.data[5],this.data[6],this.data[7],this.data[8],this.data[9],this.data[10],this.data[11],this.data[12]
  

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
      this.lineChartData.datasets[0].borderColor = 'rgba(148,159,177,1)';
      this.lineChartData.datasets[0].backgroundColor = `rgba(148,159,177,0.2)`;
      this.chart?.update();
    }
  }

  chartdropdowntoggle(){
    document.getElementById("line-chart-dropdown")!.classList.toggle('show');
  }
}
