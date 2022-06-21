import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  users: User[] = [];
  emailusername!: string;
  password!:string;
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
  }

  onSubmit(){
    if(!this.emailusername){
      alert('Please fill in your email or username')
    }else if(!this.password){
      alert('Please fill in your password')
    }else{
      for(var user of this.users){
        if(this.emailusername === user.username || this.emailusername === user.email){
          if(this.password === user.password){
            var userid = user.id;
            var userName = user.name;
            var username = user.username;
            var useremail = user.email;
            var userprivilege = user.privilege;
          }
        }
      }
    }
  }
}
