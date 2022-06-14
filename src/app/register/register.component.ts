import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
  }

}
