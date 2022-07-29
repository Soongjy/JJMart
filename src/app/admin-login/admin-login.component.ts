import { Component, OnInit } from '@angular/core';
import { Admin } from '../Admin';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from '../services/image.service';
import { Image } from '../Image';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {
  images: Image[]=[];
  admins:Admin[]=[];
  emailusername!: string;
  password!:string;
  userprivilege!:string;

  

  constructor(private adminService: AdminService,private _snackBar: MatSnackBar, private imageService:ImageService) { }

  ngOnInit(): void {
    this.images= [
      {
        page: "Admin Login Background",
        title : "Admin Login Background",
        image : "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
      }
    ]
    this.adminService.getAdmins().subscribe((admins)=> (this.admins = admins));

    this.imageService.getImages().subscribe((images)=>{
      for(var image of images){
        if (image.page=='Admin Login Background'){
          this.images=[]
          this.images.push(image)
        }
      }
    })
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
        if(this.emailusername === admin.username&&this.password === this.decryptPassword(admin.password) || this.emailusername === admin.email &&this.password === this.decryptPassword(admin.password)){
            var userid = admin.id;
            var userName = admin.name;
            var useremail = admin.email;
            this.userprivilege = admin.privilege;
            sessionStorage.clear();
            localStorage.setItem('admindetails',JSON.stringify(admin));
            sessionStorage.setItem('isAdmin','true');
            sessionStorage.setItem('admindetails',JSON.stringify(admin));
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

  decryptPassword(password:string){
    var deData= CryptoJS.AES.decrypt(decodeURIComponent(password), 'secret key 456'); 
    var decryptedPassword= JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    return decryptedPassword;
  }
}
