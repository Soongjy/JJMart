import { Component, OnInit} from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { CategoryComponent } from 'src/app/category/category.component';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit{
  constructor(private categoryService:CategoryService) { }
  doughnutChartLabels: string[]=[]
  doughnutChartData!: ChartData<'doughnut'>

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].visibility == true)
          this.doughnutChartLabels.push(categories[i].name);
      }
      console.log(this.doughnutChartLabels)
    });

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [ 350, 450, 100,1123,212,323 ]
        },
      ]
    };
  }


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

  public changepieColor(): void {
    this.ngOnInit()
  }

  piechartdropdowntoggle(){
    document.getElementById("pie-chart-dropdown")!.classList.toggle('show');
  }
}
