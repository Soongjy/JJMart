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


  addCategory(category: Category):Observable<Category>{
    return this.http.post<Category>(this.apiUrl, category, httpOptions);
  }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }

  deleteCategory(id: number):Observable<Category>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Category>(url);
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  updateCategory(category: Category):Observable<Category>{
    const url = `${this.apiUrl}/${category.id}`;
    return this.http.put<Category>(url,category,httpOptions);
  }

  updateVisiblity(category: Category):Observable<Category>{
    const url = `${this.apiUrl}/${category.id}`;
    return this.http.put<Category>(url,category,httpOptions);
  }

}
