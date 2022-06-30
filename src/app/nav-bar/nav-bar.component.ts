import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { User } from '../Users';
import {MatBadgeModule} from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userdetails !: [];
  title: string = 'Sunway Mart';
  name!: string;
  privilege!:number;
  //later create function to update counter
  cartItemCounter :number = 0;


  constructor(private cartService: CartService) {
  
   }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    for (let x in this.userdetails) {
      if (x == "name"){
        this.name = this.userdetails[x];
        console.log(this.name)
      }
      else if(x == "privilege"){
        this.privilege = this.userdetails[x];
        console.log(this.privilege)
      }
    }

    this.cartService.getProducts().subscribe((items)=>{
      this.cartItemCounter = items.length;
    })

 
  }

  onLogout(){
    if(!confirm("Do you really want Log Out?")) {
      return;
    }else{
    localStorage.setItem('userdetails',JSON.stringify(null));
    window.location.href = "/";
    }
  }

}
