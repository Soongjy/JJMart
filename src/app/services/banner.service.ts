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

  getBanner(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.apiUrl);
  }

}
