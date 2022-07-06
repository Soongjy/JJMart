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

  private apiUrl = 'http://localhost:3000/orders'

  constructor(private http:HttpClient) { }

  addOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(this.apiUrl, order, httpOptions);
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl);
  }

}
