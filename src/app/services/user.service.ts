import { Injectable } from '@angular/core';
import { User } from '../Users';
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

export class UserService {
  private apiUrl = 'http://localhost:3000/users'


  constructor(private http:HttpClient) { }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user:User):Observable<User>{
    return this.http.post<User>(this.apiUrl, user, httpOptions)
  }

  updateUser(user:User):Observable<User>{
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url,user,httpOptions);
  }
}
