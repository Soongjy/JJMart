import { HtmlParser } from '@angular/compiler';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[] = [];
  @Output() onAddUser: EventEmitter<User> =new EventEmitter();
  name!: string;
  username!: string;
  email!: string;
  phonenum!:string;
  address!:string;
  password!: string;
  repassword!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
  }

  

  onSubmit() {
    if(!this.name){
      alert('Please fill in your name')
    }else if(!this.username){
      alert(this.name + ' Please fill in your username')
    }else if(!this.email){
      alert('Please fill in your email')
    }else if(!this.password){
      alert('Please fill in your password')
    }else if(!this.repassword){
      alert('Please fill in your password')
    }else if(this.password !== this.repassword){
      alert('Password and Repeat password is not the same')
      this.password = '';
      this.repassword = '';
    //}else if (this.users.find(x => x.username === this.users)) {
    }
    else{
      var ok = true;
      for(var user of this.users){
        if(this.username === user.username){
          alert('This Username has already been taken')
          ok = false;
          break
        }else if(this.email === user.email){
          alert('This Email Has already been taken')
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

        this.name = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.address = '';
        this.phonenum = '';

        this.userService.addUser(newUser).subscribe((user: User)=>(this.users.push(user)));
    
        alert("You had Signed Up Successfully, Redirecting You to Sign Up")
        window.location.href = "/signin";
      }
    }
  }
}
