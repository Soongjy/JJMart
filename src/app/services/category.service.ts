import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:3000/categories'


  addCategory(category: Category, ):Observable<Category>{
    return this.http.post<Category>(this.apiUrl, category, httpOptions);
  }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }

}
