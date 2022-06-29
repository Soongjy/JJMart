import { identifierName } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
    const userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
    console.log(userdetails)
    for (let x in userdetails) {
      if (x == "name"){
        this.name = userdetails[x];
      }
      else if(x == "username"){
        this.username = userdetails[x];
      }
      else if(x == "email"){
        this.email = userdetails[x];
      }
      else if(x == "phonenum"){
        this.phonenum = userdetails[x];
      }
      else if(x == "address"){
        this.address = userdetails[x];
      }
      else if(x == "id"){
        this.id = userdetails[x];
      }
      
    }
  }

  onSubmit() {
    if(!this.name){
      alert('Please fill in your name')
    }else if(!this.username){
      alert(this.name + ' Please fill in your username')
    }else if(!this.email){
      alert('Please fill in your email')
    }else if(!this.phonenum){
      alert('Please fill in your phone number')
    }else if(!this.address){
      alert('Please fill in your address')
    }else if(!this.password){
      alert('Please fill in your password')
    }else if(!this.repassword){
      alert('Please fill in your repeat password')
    }else if(this.password !== this.repassword){
      alert('Password and Repeat password is not the same')
      this.password = '';
      this.repassword = '';
    //}else if (this.users.find(x => x.username === this.users)) {
    }
    else{
      var ok = true;
      for(var user of this.users){
        if(this.username === user.username && this.id!==user.id){
          alert('This Username has already been taken')
          ok = false;
          break
        }else if(this.email === user.email && this.id!==user.id){
          alert('This Email Has already been taken')
          ok = false;
          break
        }else if(this.phonenum === user.phonenum && this.id!==user.id){
          alert('This Phone Number Has already been taken')
          ok = false;
          break
        }else if(this.password !== user.password){
          alert("Please insert the old password to edit the user's details")
          ok = false;
          break
        }
      }
      if(ok == true){
        const newUser = {
          name: this.name,
          username :this.username,
          email: this.email,
          password: this.password,
          privilege: 0,
          phonenum: this.phonenum,
          address: this.address
        };

        this.userService.addUser(newUser).subscribe((user: User)=>(this.users.push(user)));
    
        alert("Your Profile Edited Successfully")
        
      }
    }
  }
}

