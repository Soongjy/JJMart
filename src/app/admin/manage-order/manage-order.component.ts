import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/Order';
import { OrderService } from 'src/app/services/order.service';
import { Product } from 'src/app/Product';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  orders: Order[] = [];
  displayedColumns: string[] = ['id','name','orderdate','address','totalPrice','actions'];
  dataSource = new MatTableDataSource<Order>();

  name!: string;
  searchTerm!:any;
  editName!: string;
  orderid!: number;
  selectedOrder?: number;
  grandTotal!: number;
  cartData: Product[] = [];
  address!: string;
  status!: string;

  myControl = new FormControl<string | Order>('');
  options: Order[] = [];
  filteredOptions!: Observable<Order[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  


  constructor(
    private orderService: OrderService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchOrders();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  private _filter(name: string): Order[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  fetchOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.paginator = this.paginator;
      this.options =orders;
    });
  }

  
  deleteConfirmation(event:any){
    this.orderid = event.target.dataset.sectionvalue;
    this.orderService.getOrder(this.orderid).subscribe((order) => {
      this.selectedOrder = order.id;
    });

  }

  deleteOrder() {
    this.orderService.deleteOrder(this.orderid).subscribe();
    setTimeout(() => {
      this._snackBar.open(this.selectedOrder + ' deleted!', 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    }, 100);

  }

  editOrder(event: any) {
    this.orderid = event.target.dataset.sectionvalue;
    this.orderService.getOrder(this.orderid).subscribe((order) => {
      this.editName = order.name;
    });
  }

  updateOrderChanges() {
    const updateOrder = {
      orderDate: new Date(),
      totalPrice: this.grandTotal,
      products: this.cartData,
      name: this.name,
      address: this.address,
      status: this.status,
      id: this.orderid,
    };

    this.orderService.updateOrder(updateOrder).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open( updateOrder.name + ' updated!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 100);
    });
  }

  search(){
    console.log(this.searchTerm)
    
    if(this.searchTerm){
      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders.filter( orders =>
          (orders.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||orders.address.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||orders.id==this.searchTerm)
        )
      });
    }else{
      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders;
      });
    }
    this.dataSource = new MatTableDataSource<Order>(this.orders);
    this.dataSource.paginator = this.paginator;
  }  
}

