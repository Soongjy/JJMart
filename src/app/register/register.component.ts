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
  password!: string;
  repassword!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTask().subscribe((users)=> (this.users = users))
  }

  onSubmit() {
    if(!this.name){
      alert('Please fill in your name')
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
      return
    }

    const newUser = {
      name: this.name,
      username :this.username,
      email: this.email,
      password: this.password
    };

    this.onAddUser.emit(newUser); 

    this.name = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.repassword = '';
  }
}
