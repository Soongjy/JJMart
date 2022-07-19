import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Product';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  addProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product, httpOptions);
  }

  updateProduct(product: Product):Observable<Product>{
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(url,product,httpOptions);
  }

  updateVisiblity(product: Product):Observable<Product>{
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(url,product,httpOptions);
  }

  deleteProduct(id: number):Observable<Product>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Product>(url);
  }


}
