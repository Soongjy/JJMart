import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../Image';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/images'

  addImage(image: Image):Observable<Image>{
    return this.http.post<Image>(this.apiUrl,image,httpOptions);
  }

  getImages(): Observable<Image[]>{
    return this.http.get<Image[]>(this.apiUrl);
  }

  getImage(id: number): Observable<Image> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Image>(url);
  }

  updateImage(image: Image):Observable<Image>{
    const url = `${this.apiUrl}/${image.id}`;
    return this.http.put<Image>(url,image,httpOptions);
  }

  deleteImage(id:number):Observable<Image>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Image>(url);
  }
}
