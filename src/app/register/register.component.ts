import { HtmlParser } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from '../services/image.service';
import { Image } from '../Image';
import { CartService } from '../services/cart.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  images:Image[]=[];
  users: User[] = [];
  @Output() onAddUser: EventEmitter<User> =new EventEmitter();
  name!: string;
  username!: string;
  email!: string;
  phonenum!:string;
  address!:string;
  password!: string;
  repassword!: string;

  public encryptInfo!: string;
  public decryptedInfo!: string;
  
  constructor(private userService: UserService, private _snackBar: MatSnackBar, private imageService: ImageService, private cartService: CartService) { }

  ngOnInit(): void {
    
    this.userService.getUsers().subscribe((users)=> (this.users = users));

    this.imageService.getImages().subscribe((images)=>{
      for(var image of images){
        if (image.page=='Register'){
          this.images.push(image)
        }
      }
    })
  }

  

  onSubmit() {
    if(!this.name){
      this._snackBar.open("Please fill in your name", "Close", {
        duration: 2000
      });
    }else if(!this.username){
      this._snackBar.open(this.name + ' Please fill in your Username', "Close", {
        duration: 2000
      })
    }else if(!this.email){
      this._snackBar.open("Please fill in your Email", "Close", {
        duration: 2000
      });
    }else if(!this.phonenum){
      this._snackBar.open("Please fill in your Phone Number", "Close", {
        duration: 2000
      });
    }else if(!this.address){
      this._snackBar.open("Please fill in your Address", "Close", {
        duration: 2000
      });
    }else if(!this.password){
      this._snackBar.open("Please fill in your Password", "Close", {
        duration: 2000
      });
    }else if(!this.repassword){
      this._snackBar.open("Please fill in your Repeat Password", "Close", {
        duration: 2000
      });
    }else if(this.password !== this.repassword){
      this._snackBar.open("Password and Repeat password is not the same", "Close", {
        duration: 2000
      });
      this.password = '';
      this.repassword = '';
    //}else if (this.users.find(x => x.username === this.users)) {
    }else{
      var ok = true;
      for(var user of this.users){
        if(this.username === user.username){
          this._snackBar.open("This Username has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.email === user.email){
          this._snackBar.open("This Email Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.phonenum === user.phonenum){
          this._snackBar.open("This Phone Number Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }
      }

      if(ok == true){
        
        const newUser = {
          name: this.name,
          username :this.username,
          email: this.email,
          password: encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(this.password), 'secret key 123').toString()),
          privilege: '0',
          phonenum: this.phonenum,
          address: this.address
        };

        const newCart = {
          username: this.username,
          products: []
        };

        this.cartService.newCart(newCart).subscribe();

        this.name = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.address = '';
        this.phonenum = '';

        this.userService.addUser(newUser).subscribe((user: User)=>(this.users.push(user)));

     
        
        this._snackBar.open("You had Signed Up Successfully, Redirecting You to Sign Up", "Close", {
          duration: 2000
        });
        setTimeout(() => {
          window.location.href = ("/signin");
        }, 1000);
      }
    }
  }

}
