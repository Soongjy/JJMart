import { Injectable } from '@angular/core';
import { Admin } from '../Admin';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin'


  constructor(private http:HttpClient) { }

  getAdmins(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiUrl);
  }

  addAdmin(admin:Admin):Observable<Admin>{
    return this.http.post<Admin>(this.apiUrl, admin, httpOptions)
  }

  updateAdmin(admin:Admin):Observable<Admin>{
    const url = `${this.apiUrl}/${admin.id}`;
    return this.http.put<Admin>(url,admin,httpOptions);
  }

  getAdmin(id: number): Observable<Admin> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Admin>(url);
  }

  deleteAdmin(id:number):Observable<Admin>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Admin>(url);
  }
}
