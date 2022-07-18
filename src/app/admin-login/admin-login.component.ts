import { Component, OnInit } from '@angular/core';
import { Admin } from '../Admin';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {
  admins:Admin[]=[];
  emailusername!: string;
  password!:string;
  userprivilege!:number;
  

  constructor(private adminService: AdminService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.adminService.getUser().subscribe((admins)=> (this.admins = admins))
  }

  onSubmit(){
    var found = 0;
    if(!this.emailusername){
      this._snackBar.open("Please fill in your username or email", "Close", {
        duration: 2000
      });
    }else if(!this.password){
      this._snackBar.open("Please fill in your password", "Close", {
        duration: 2000
      });
    }else{
      for(var admin of this.admins){
        if(this.emailusername === admin.username||this.emailusername === admin.email){
          found = 1; 
        }
        if(this.emailusername === admin.username&&this.password === admin.password || this.emailusername === admin.email &&this.password === admin.password){
            var userid = admin.id;
            var userName = admin.name;
            var useremail = admin.email;
            this.userprivilege = admin.privilege;
            localStorage.setItem('userdetails',JSON.stringify(null))
            localStorage.setItem('admindetails',JSON.stringify(admin));
            found = 2;
            break;
        }else{
            continue;
        }
      }
      if(found == 1){
        this._snackBar.open("Your Password is incorrect", "Close", {
          duration: 2000
        });
      }else if(found == 0){
        this._snackBar.open("The Username doesn't exist", "Close", {
          duration: 2000
        });
      }else if(found == 2){
        this._snackBar.open("Login Successfully", "Close", {
          duration: 2000
        });
        this.emailusername = '';
        this.password = '';
        setTimeout(() => {
          window.location.href = "/admin";
        }, 500);
      }
    }
  }
}
