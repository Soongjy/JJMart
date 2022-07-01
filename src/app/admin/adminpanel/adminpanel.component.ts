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

  togglesidepanel(){
    document.getElementById("collapseUtilities")!.classList.toggle('show');
    document.getElementById("collapseheader")!.classList.toggle('collapsed')
  }
}
