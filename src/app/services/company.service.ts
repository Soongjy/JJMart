import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../Company';


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


  getCompanyInfo(id: number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Company>(url);
  }

  updateCompanyInfo(company:Company):Observable<Company>{
    const url = `${this.apiUrl}/${1}`;
    return this.http.put<Company>(url,company,httpOptions);
  }
}
