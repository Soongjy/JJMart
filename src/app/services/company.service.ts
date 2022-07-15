import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})


export class CompanyService {

  private apiUrl = 'http://localhost:3000/company';

  constructor(private http:HttpClient) { }

  getCompanyInfo(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  updateCompanyInfo(company:any):Observable<any>{
    const url = `${this.apiUrl}/${1}`;
    return this.http.put<any>(url,company,httpOptions);
  }
}
