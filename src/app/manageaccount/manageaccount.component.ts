import { identifierName } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manageaccount',
  templateUrl: './manageaccount.component.html',
  styleUrls: ['./manageaccount.component.css']
})
export class ManageaccountComponent implements OnInit {
  users: User[] = [];
  @Output() onAddUser: EventEmitter<User> =new EventEmitter();
  name!: string;
  username!: string;
  email!: string;
  phonenum!:string;
  address!:string;
  password!: string;
  repassword!: string;
  id!:number;
  oldpassword!:string;
  privilege!:number;
  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users)=> (this.users = users))
    const userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
      this.name = userdetails.name;
      this.username = userdetails.username;
      this.email = userdetails.email;
      this.phonenum = userdetails.phonenum;
      this.address = userdetails.address;
      this.id = userdetails.id;
      this.oldpassword = userdetails.password;
      this.privilege = userdetails.privilege;
  }
  

  onUpdate() {
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
    }
    else{
      var ok = true;
      for(var user of this.users){
        if(this.username === user.username && this.id!==user.id){
          this._snackBar.open("This Username has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.email === user.email && this.id!==user.id){
          this._snackBar.open("This Email Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.phonenum === user.phonenum && this.id!==user.id){
          this._snackBar.open("This Phone Number Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.oldpassword !== this.password){
          this._snackBar.open("Incorrect Old Password", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }
      }
      if(ok == true){
        const updateUser = {
          name: this.name,
          username :this.username,
          email: this.email,
          password: this.password,
          privilege: this.privilege,
          phonenum: this.phonenum,
          address: this.address,
          id:this.id,
        };

        if(!confirm("Do you really want change information?")) {
          return;
        }else{
        this.userService.updateUser(updateUser).subscribe();
        localStorage.setItem('userdetails',JSON.stringify(updateUser));

        this._snackBar.open("Your Profile Edited Successfully", "Close", {
          duration: 2000
        });
        this.password='';
        this.repassword='';
        }
      }
    }
  }
}

