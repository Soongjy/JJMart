import { Injectable } from '@angular/core';

import { User } from '../Users';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users'


  constructor(private http:HttpClient) { }

  getTask(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
}
