import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { User } from '../Users';

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
  cartItemCounter !:number;

  constructor(private cartService: CartService) { }

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
  }

  onLogout(){
    if(!confirm("Do you really want Log Out?")) {
      return;
    }else{
    localStorage.setItem('userdetails',JSON.stringify(null));
    window.location.href = "/";
    }
  }

  // getItemCount(){
  //   this.cartItemCounter = this.cartService.getCartItems().length;
  //   console.log("THERE ARE" + this.cartItemCounter);
  // }
}
