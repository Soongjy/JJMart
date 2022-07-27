import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../Order';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  updateVisiblity(order: Order) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/orders'

  constructor(private http:HttpClient) { }

  addOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(this.apiUrl, order, httpOptions);
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl);
  }

  deleteOrder(id: number):Observable<Order>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Order>(url);
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  updateOrder(order: Order):Observable<Order>{
    const url = `${this.apiUrl}/${order.id}`;
    return this.http.put<Order>(url,order,httpOptions);
  }
}
