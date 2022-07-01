import { identifierName } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private router: Router, 
              private _snackBar: MatSnackBar) { }

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
      this._snackBar.open("Please fill in your old password", "Close", {
        duration: 2000
      });
    }else if(!this.reoldpassword){
      this._snackBar.open("Please repeat your old password", "Close", {
        duration: 2000
      });
    }else if(!this.password){
      this._snackBar.open("Please fill in your new password", "Close", {
        duration: 2000
      });
    }else if(!this.repassword){
      this._snackBar.open("Please repeat your new password", "Close", {
        duration: 2000
      });
    }else if(userdetails.password !== this.oldpassword){
      this._snackBar.open("Wrong Password", "Close", {
        duration: 2000
      });
      this.oldpassword = '';
      this.reoldpassword = '';
    }else if(this.oldpassword !== this.reoldpassword){
      this._snackBar.open("Old Password and Old Repeat password is not the same", "Close", {
        duration: 2000
      });
      this.oldpassword = '';
      this.reoldpassword = '';
    }else if(this.password !== this.repassword){
      this._snackBar.open("New Password and New Repeat password is not the same", "Close", {
        duration: 2000
      });
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
        
      this._snackBar.open("Password Changed Successfully", "Close", {
        duration: 2000
      });

      this.oldpassword = '';
      this.reoldpassword = '';
      this.password = '';
      this.repassword = '';

      setTimeout(() => {
        window.location.href = "/manageaccount";
      }, 1000);
      }
    }
  }
}

