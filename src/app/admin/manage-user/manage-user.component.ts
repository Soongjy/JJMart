import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})

export class ManageUserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'username','phonenum', 'email', 'address','actions'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  users: User[] = [];
  userId!:number;
  deleteUserName!:string;
  name!: string;
  username!: string;
  email!: string;
  phonenum!: string;
  address!: string;
  password!: string;
  repassword!: string;
  privilege!:string;

  updatename: any;
  updateusername: any;
  updateemail: any;
  updatephonenum: any;
  updateaddress: any;
  updatepassword: any;
  updaterepassword: any;
  updateprivilege: any;

  searchTerm!:any;
  myControl = new FormControl<string | User>('');
  options: User[] = [];
  filteredOptions!: Observable<User[]>;

  constructor(private userService: UserService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users)=> {
    this.users = users;
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
    this.options =users;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  createNewUser(){
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
          password: this.password,
          privilege: this.privilege,
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
        this.privilege = '';

        this.userService.addUser(newUser).subscribe((user: User)=>(this.users.push(user)));
        
        this._snackBar.open("New User Create Successfull", "Close", {
          duration: 2000
        });
        this.ngOnInit();
      }
    }
  }

  deleteConfirmation(event:any){
    this.userId = event.target.dataset.sectionvalue;
    this.userService.getUser(this.userId).subscribe((user) => {
      this.deleteUserName = user.name;
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe();
    setTimeout(() => {
      this._snackBar.open(this.deleteUserName +' deleted!', 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    }, 100);
  }

  editUsers(event: any) {
    this.userId = event.target.dataset.sectionvalue;
    this.userService.getUser(this.userId).subscribe((user) => {
      this.updatename = user.name;
      this.updateusername = user.username;
      this.updateemail = user.email;
      this.updatepassword = user.password;
      this.updateaddress = user.address;
      this.updatephonenum = user.phonenum;
      this.updateprivilege = user.privilege;
    });
  }
  
  updateUser(){
    if(!this.updatename){
      this._snackBar.open("Please fill in your name", "Close", {
        duration: 2000
      });
    }else if(!this.updateusername){
      this._snackBar.open(this.name + ' Please fill in your Username', "Close", {
        duration: 2000
      })
    }else if(!this.updateemail){
      this._snackBar.open("Please fill in your Email", "Close", {
        duration: 2000
      });
    }else if(!this.updatephonenum){
      this._snackBar.open("Please fill in your Phone Number", "Close", {
        duration: 2000
      });
    }else if(!this.updateaddress){
      this._snackBar.open("Please fill in your Address", "Close", {
        duration: 2000
      });
    }else if(!this.updatepassword){
      this._snackBar.open("Please fill in your Password", "Close", {
        duration: 2000
      });
    }else if(this.updaterepassword&&this.updatepassword !== this.updaterepassword){
      this._snackBar.open("Password and Repeat password is not the same", "Close", {
        duration: 2000
      });
      this.updatepassword = '';
      this.updaterepassword = '';
    //}else if (this.users.find(x => x.username === this.users)) {
    }else{
      var ok = true;
      for(var user of this.users){
        if(this.updateusername === user.username  && this.userId!=user.id){
          this._snackBar.open("This Username has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.updateemail === user.email && this.userId!=user.id){
          this._snackBar.open("This Email Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.updatephonenum === user.phonenum && this.userId!=user.id){
          this._snackBar.open("This Phone Number Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }
      }
      if(ok == true){
        const updateUser = {
          name: this.updatename,
          username :this.updateusername,
          email: this.updateemail,
          password: this.updatepassword,
          privilege: this.updateprivilege,
          phonenum: this.updatephonenum,
          address: this.updateaddress,
          id:this.userId,
        };

        this.updatename = '';
        this.updateusername = '';
        this.updateemail = '';
        this.updatepassword = '';
        this.updaterepassword = '';
        this.updateaddress = '';
        this.updatephonenum = '';
        this.updateprivilege = '';

        this.userService.updateUser(updateUser).subscribe((user: User)=>(this.users.push(user)));
        
        this._snackBar.open("User Updated Successfully", "Close", {
          duration: 2000
        });
        this.ngOnInit();
      }
    }
  }

  search(){
    if(this.searchTerm){
      this.userService.getUsers().subscribe((users) => {
        this.users = users.filter( users =>
          (users.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||users.id==this.searchTerm)
        )
      });
    }else{
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
      });
    }
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }  
}


