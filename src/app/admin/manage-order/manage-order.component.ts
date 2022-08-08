import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/Order';
import { OrderService } from 'src/app/services/order.service';
import { Product } from 'src/app/Product';
import { ActivatedRoute } from '@angular/router';

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
  displayedColumns: string[] = ['id','name','orderdate','address','totalPrice','status','actions'];
  dataSource = new MatTableDataSource<Order>();

  name!: string;
  searchTerm!:any;
  orderDate!: Date;
  orderid!: number;
  selectedOrder?: number;
  pagestatus!:string;

  address!: string;
  status!: string; 
  products!: Product[]; 
  totalAmount!: number;

  myControl = new FormControl<string | Order>('');
  options: Order[] = [];
  filteredOptions!: Observable<Order[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  
  


  constructor(
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    this.route.params.subscribe(routeParams => {
      if(this.route.snapshot.paramMap.get('params') as string == 'Pending'){
        this.pagestatus = 'Pending';
      }else{
        this.fetchOrders();
      }
    });
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

  order(event: any) {
    this.orderid = event.target.dataset.sectionvalue;
    this.orderService.getOrder(this.orderid).subscribe((order) => {
      this.name = order.name;
      this.orderDate = order.orderDate;
      this.address= order.address;
      this.totalAmount = order.totalPrice;
      this.status = order.status;
      this.products = order.products
    });
  }

  ApproveOrder() {
    const ApproveOrder = {
      orderDate: this.orderDate,
      totalPrice: this.totalAmount,
      products: this.products,
      name: this.name,
      address: this.address,
      status: "Approved",
      id: this.orderid,
    };

    this.orderService.updateOrder(ApproveOrder).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open("Order ID "+ ApproveOrder.id + ' Approved!', 'Close', {
          duration: 2000,
        });
        if(this.pagestatus=="Approved"){
          this.orderApproved()
        }else if(this.pagestatus=="Pending"){
          this.orderPending()
        }else if(this.pagestatus=="Rejected"){
          this.orderRejected()
        }else{this.ngOnInit();}
      }, 100);
    });
  }

  rejectOrder() {
    const ApproveOrder = {
      orderDate: this.orderDate,
      totalPrice: this.totalAmount,
      products: this.products,
      name: this.name,
      address: this.address,
      status: "Rejected",
      id: this.orderid,
    };

    this.orderService.updateOrder(ApproveOrder).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open("OrderID "+ ApproveOrder.id + ' Rejected!', 'Close', {
          duration: 2000,
        });
        if(this.pagestatus=="Approved"){
          this.orderApproved()
        }else if(this.pagestatus=="Pending"){
          this.orderPending()
        }else if(this.pagestatus=="Rejected"){
          this.orderRejected()
        }else{this.ngOnInit()};
      }, 100);
    });
  }

  search(){    
    if(this.searchTerm){
      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders.filter( orders =>
          (orders.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||orders.address.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||orders.status.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||orders.id==this.searchTerm)
        )
        this.pagestatus='';
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
      });
    }else if(this.pagestatus){
      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders.filter( orders =>
          orders.status.toLocaleLowerCase().includes(this.pagestatus.toLocaleLowerCase()))
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
      });
    }else{
      this.orderService.getOrders().subscribe((orders) => {
        this.orders = orders;
        this.pagestatus='';
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  orderRejected(){
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders.filter(orders =>
        (orders.status=="Rejected")
      )
      this.pagestatus="Rejected"
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.paginator = this.paginator;
    });
  }

  orderPending(){
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders.filter(orders =>
        (orders.status=="Pending")
      )
      this.pagestatus="Pending"
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.paginator = this.paginator;
    });
  }

  orderApproved(){
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders.filter(orders =>
        (orders.status=="Approved")
      )
      this.pagestatus="Approved"
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.paginator = this.paginator;
    });
  }
}

