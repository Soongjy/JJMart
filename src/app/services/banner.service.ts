import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner } from '../Banner';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class BannerService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/banners'

  addBanner(banner: Banner):Observable<Banner>{
    return this.http.post<Banner>(this.apiUrl,banner,httpOptions);
  }

  getBanners(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.apiUrl);
  }

  getBanner(id: number): Observable<Banner> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Banner>(url);
  }

  updateBanner(banner: Banner):Observable<Banner>{
    const url = `${this.apiUrl}/${banner.id}`;
    return this.http.put<Banner>(url,banner,httpOptions);
  }

  deleteBanner(banner: Banner):Observable<Banner>{
    const url = `${this.apiUrl}/${banner.id}`;
    return this.http.delete<Banner>(url);
  }
}
