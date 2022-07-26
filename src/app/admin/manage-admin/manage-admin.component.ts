import { Component, ViewChild, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../Admin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})

export class ManageAdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'adminname','phonenum', 'email', 'address','actions'];
  dataSource = new MatTableDataSource<Admin>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  admins: Admin[] = [];
  adminId!:number;
  deleteAdminName!:string;
  name!: string;
  adminname!: string;
  email!: string;
  phonenum!: string;
  address!: string;
  password!: string;
  repassword!: string;
  privilege!:string;

  updatename: any;
  updateadminname: any;
  updateemail: any;
  updatephonenum: any;
  updateaddress: any;
  updatepassword: any;
  updaterepassword: any;
  updateprivilege: any;

  searchTerm!:any;
  myControl = new FormControl<string | Admin>('');
  options: Admin[] = [];
  filteredOptions!: Observable<Admin[]>;

  constructor(private adminService: AdminService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe((admins)=> {
    this.admins = admins;
    this.dataSource = new MatTableDataSource<Admin>(this.admins);
    this.dataSource.paginator = this.paginator;
    this.options =admins;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(admin: Admin): string {
    return admin && admin.name ? admin.name : '';
  }

  private _filter(name: string): Admin[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  createNewAdmin(){
    if(!this.name){
      this._snackBar.open("Please fill in your name", "Close", {
        duration: 2000
      });
    }else if(!this.adminname){
      this._snackBar.open(this.name + ' Please fill in your Adminname', "Close", {
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
    //}else if (this.admins.find(x => x.adminname === this.admins)) {
    }else{
      var ok = true;
      for(var admin of this.admins){
        if(this.adminname === admin.username){
          this._snackBar.open("This Adminname has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.email === admin.email){
          this._snackBar.open("This Email Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.phonenum === admin.phonenum){
          this._snackBar.open("This Phone Number Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }
      }
      if(ok == true){
        const newAdmin = {
          name: this.name,
          username :this.adminname,
          email: this.email,
          password: this.password,
          privilege: this.privilege,
          phonenum: this.phonenum,
          address: this.address
        };

        this.name = '';
        this.adminname = '';
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.address = '';
        this.phonenum = '';
        this.privilege = '';

        this.adminService.addAdmin(newAdmin).subscribe((admin: Admin)=>(this.admins.push(admin)));
        
        this._snackBar.open("New Admin Create Successfull", "Close", {
          duration: 2000
        });
        this.ngOnInit();
      }
    }
  }

  deleteConfirmation(event:any){
    this.adminId = event.target.dataset.sectionvalue;
    this.adminService.getAdmin(this.adminId).subscribe((admin) => {
      this.deleteAdminName = admin.name;
    });
  }

  deleteAdmin() {
    this.adminService.deleteAdmin(this.adminId).subscribe();
    setTimeout(() => {
      this._snackBar.open(this.deleteAdminName +' deleted!', 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    }, 100);
  }

  editAdmins(event: any) {
    this.adminId = event.target.dataset.sectionvalue;
    this.adminService.getAdmin(this.adminId).subscribe((admin) => {
      this.updatename = admin.name;
      this.updateadminname = admin.username;
      this.updateemail = admin.email;
      this.updatepassword = admin.password;
      this.updateaddress = admin.address;
      this.updatephonenum = admin.phonenum;
      this.updateprivilege = admin.privilege;
    });
  }
  
  updateAdmin(){
    if(!this.updatename){
      this._snackBar.open("Please fill in your name", "Close", {
        duration: 2000
      });
    }else if(!this.updateadminname){
      this._snackBar.open(this.name + ' Please fill in your Adminname', "Close", {
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
    //}else if (this.admins.find(x => x.adminname === this.admins)) {
    }else{
      var ok = true;
      for(var admin of this.admins){
        if(this.updateadminname === admin.username  && this.adminId!=admin.id){
          this._snackBar.open("This Adminname has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.updateemail === admin.email && this.adminId!=admin.id){
          this._snackBar.open("This Email Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }else if(this.updatephonenum === admin.phonenum && this.adminId!=admin.id){
          this._snackBar.open("This Phone Number Has already been taken", "Close", {
            duration: 2000
          });
          ok = false;
          break
        }
      }
      if(ok == true){
        const updateAdmin = {
          name: this.updatename,
          username :this.updateadminname,
          email: this.updateemail,
          password: this.updatepassword,
          privilege: this.updateprivilege,
          phonenum: this.updatephonenum,
          address: this.updateaddress,
          id:this.adminId,
        };

        this.updatename = '';
        this.updateadminname = '';
        this.updateemail = '';
        this.updatepassword = '';
        this.updaterepassword = '';
        this.updateaddress = '';
        this.updatephonenum = '';
        this.updateprivilege = '';

        this.adminService.updateAdmin(updateAdmin).subscribe((admin: Admin)=>(this.admins.push(admin)));
        
        this._snackBar.open("Admin Updated Successfully", "Close", {
          duration: 2000
        });
        this.ngOnInit();
      }
    }
  }

  search(){
    if(this.searchTerm){
      this.adminService.getAdmins().subscribe((admins) => {
        this.admins = admins.filter( admins =>
          (admins.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||admins.id==this.searchTerm
          )
        )
      });
    }else{
      this.adminService.getAdmins().subscribe((admins) => {
        this.admins = admins;
      });
    }
    this.dataSource = new MatTableDataSource<Admin>(this.admins);
    this.dataSource.paginator = this.paginator;
  } 
}


