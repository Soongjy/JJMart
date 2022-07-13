import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})

export class ManageUserComponent implements OnInit,AfterViewInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
  
  }

  constructor(private userService: UserService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((users)=> {
    this.users = users;
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
    });
  }
}


