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
  

  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
  }

  onSubmit(){
    var found = 0;
    if(!this.emailusername){
      alert('Please fill in your email or username')
    }else if(!this.password){
      alert('Please fill in your password')
    }else{
      for(var user of this.users){
        if(this.emailusername === user.username||this.emailusername === user.email){
          found = 1; 
        }
        if(this.emailusername === user.username&&this.password === user.password || this.emailusername === user.email &&this.password === user.password){
            var userid = user.id;
            var userName = user.name;
            var useremail = user.email;
            var userprivilege = user.privilege;
            localStorage.setItem('userdetails',JSON.stringify(user));
            found = 2;
            break;
        }else{
            continue;
        }
      }
      if(found == 1){
        alert("Your Password is incorrect")
      }else if(found == 0){
        alert("The Username doesn't exist")
      }else if(found == 2){
        alert("Login Successfully")
        this.emailusername = '';
        this.password = '';
         window.location.href = "/signin";
      }
    }
  }
  
}
