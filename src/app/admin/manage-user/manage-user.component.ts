import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Users';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
  }


}
