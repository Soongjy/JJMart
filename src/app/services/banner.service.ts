import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private apiUrl = 'http://localhost:3000/banners'

  constructor(private http:HttpClient) { }

  updateBanner(banner: any):Observable<any>{
    return this.http.post<any>(this.apiUrl, banner, httpOptions);
  }

  
}
