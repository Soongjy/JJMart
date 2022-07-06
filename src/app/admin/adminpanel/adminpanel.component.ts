import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
    
  }

  toggleComponents(){
    document.getElementById("collapseComponentsheader")!.classList.toggle('collapsed');
    document.getElementById("collapseComponents")!.classList.toggle('show');
  }

  toggleUtilities(){
    document.getElementById("collapseUtilitiesheader")!.classList.toggle('collapsed');
    document.getElementById("collapseUtilities")!.classList.toggle('show');
  }

  togglePages(){
    document.getElementById("collapsePagesheader")!.classList.toggle('collapsed');
    document.getElementById("collapsePages")!.classList.toggle('show');
  }
}
