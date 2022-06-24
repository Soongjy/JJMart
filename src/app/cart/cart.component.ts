import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // increaseQty(qtyId) {
  //   var location = document.getElementById(qtyId);
  //   var currentQty = location.value;
  //   var qty = Number(currentQty) + 1;
  //   location.value = qty;
  // }


  addFunction(){
    var quantity = document.getElementById("quantityValue") as HTMLInputElement;
    var total = document.getElementById("total")!.innerHTML;
    var qty = Number(quantity.value) +1;
    quantity.value = qty.toString();
    var total1 = Number(total) * qty;
    console.log(quantity.value);
    console.log(total1);
  }
  minusFunction(){
    var quantity = document.getElementById("quantityValue") as HTMLInputElement;
    var qty:number = 1;
    if(Number(quantity.value)>1){
      qty = Number(quantity.value)-1;
    }
    else{
      qty=1;
    }
    quantity.value = qty.toString();
    console.log(quantity.value);
  }

}
