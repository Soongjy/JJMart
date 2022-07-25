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
  private apiUrlAboutUs = 'http://localhost:3000/aboutus';
  private apiUrlContactUs = 'http://localhost:3000/contactus';

  constructor(private http:HttpClient) { }

  getContactUs(id: number): Observable<any> {
    const url = `${this.apiUrlContactUs}/${id}`;
    return this.http.get<any>(url);
  }

  updateContactUs(contactUs:any):Observable<any>{
    const url = `${this.apiUrlContactUs}/${1}`;
    return this.http.put<any>(url,contactUs,httpOptions);
  }

  getAboutUs(id: number): Observable<any> {
    const url = `${this.apiUrlAboutUs}/${id}`;
    return this.http.get<any>(url);
  }

  updateAboutUs(aboutUs:any):Observable<any>{
    const url = `${this.apiUrlAboutUs}/${1}`;
    return this.http.put<any>(url,aboutUs,httpOptions);
  }
  
  getCompanyInfo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateCompanyInfo(company:any):Observable<any>{
    const url = `${this.apiUrl}/${1}`;
    return this.http.put<any>(url,company,httpOptions);
  }
}
