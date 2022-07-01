import { identifierName } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  users: User[] = [];
  @Output() onAddUser: EventEmitter<User> =new EventEmitter();
  password!: string;
  repassword!: string;
  id!:number;
  oldpassword!:string;
  reoldpassword!:string;
  privilege!:number;
  constructor(private userService: UserService,
              private router: Router,) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
    const userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    for (let x in userdetails) {
      if(x == "id"){
        this.id = userdetails[x];
      }
    }
  }

  onCancel(){
    this.router.navigate(['/manageaccount'])
  }

  onChangePassword(){
    const userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    if(!this.oldpassword){
      alert('Please fill in your old password')
    }else if(!this.reoldpassword){
      alert(' Please repeat your old password')
    }else if(!this.password){
      alert('Please fill in your new password')
    }else if(!this.repassword){
      alert('Please repeat your new password')
    }else if(userdetails.password !== this.oldpassword){
      alert('Wrong Password')
      this.oldpassword = '';
      this.reoldpassword = '';
    }else if(this.oldpassword !== this.reoldpassword){
      alert('Old Password and Old Repeat password is not the same')
      this.oldpassword = '';
      this.reoldpassword = '';
    }else if(this.password !== this.repassword){
      alert('New Password and New Repeat password is not the same')
      this.password = '';
      this.repassword = '';
    }
    else{

      if(!confirm("Do you really want change password?")) {
        return;
      }else{
      const userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
      userdetails.password = this.password
      this.userService.updateUser(userdetails).subscribe();
      localStorage.setItem('userdetails',JSON.stringify(userdetails));

      this.oldpassword = '';
      this.reoldpassword = '';
      this.password = '';
      this.repassword = '';

      window.location.href = "/manageaccount";
      }
    }
  }
}

