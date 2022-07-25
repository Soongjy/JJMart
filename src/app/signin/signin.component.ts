import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Image } from '../Image';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  users: User[] = [];
  emailusername!: string;
  password!:string;
  userprivilege!:string;
  images:Image[]=[];

  constructor(private userService: UserService,private _snackBar: MatSnackBar,private imageService:ImageService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users)=> (this.users = users))

    this.imageService.getImages().subscribe((images)=>{
      for(var image of images){
        if (image.page=='Log in'){
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
      for(var user of this.users){
        if(this.emailusername === user.username||this.emailusername === user.email){
          found = 1; 
        }
        if(this.emailusername === user.username&&this.password === user.password || this.emailusername === user.email &&this.password === user.password){
            var userid = user.id;
            var userName = user.name;
            var useremail = user.email;
            this.userprivilege = user.privilege;
            localStorage.setItem('userdetails',JSON.stringify(user));
            sessionStorage.setItem('userdetails',JSON.stringify(user));
            sessionStorage.setItem('isUser','true')
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
          window.location.href = "/";
        }, 500);
      }
    }
  }
  
}
