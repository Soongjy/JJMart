import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { BannerService } from 'src/app/services/banner.service';
import { Banner } from 'src/app/Banner';

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.css']
})
export class ManageBannersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'page', 'title', 'image','actions'];
  dataSource = new MatTableDataSource<Banner>();

  banners:Banner[] = [];
  page!: string;
  title!: string;
  image!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _snackBar: MatSnackBar, private bannerService: BannerService) { }

  ngOnInit(): void {
    this.fetchBanners();
  }

  onSubmit() {
    if(!this.page){
      this._snackBar.open("Please fill in your target page", "Close", {
        duration: 2000
      });
    }else if(!this.title){
      this._snackBar.open("Please fill in your title", "Close", {
        duration: 2000
      })
    }else if(!this.image){
      this._snackBar.open("Please select your image", "Close", {
        duration: 2000
      });
    }else{
      var inputElement: HTMLInputElement = document.getElementById(
        'image'
      )! as HTMLInputElement;

      const newBanner = {
        page: this.page,
        title :this.title,
        image: 'assets/' + inputElement.files![0].name,
      }

      this.bannerService.addBanner(newBanner).subscribe((banners:Banner) => this.banners.push(banners));
      this.copyImage();
      this.ngOnInit();


      this.page = '';
      this.title = '';
      this.image = '';
    }
  }

  fetchBanners() {
    this.bannerService.getBanner().subscribe((banners) => {
      this.banners = banners;
      this.dataSource = new MatTableDataSource<Banner>(this.banners);
      this.dataSource.paginator = this.paginator;
    });
  }

  copyImage() {
    //copyfile.js
    /*const fs = require('fs');

    // destination will be created or overwritten by default.
    fs.copyFile(this.image, 'C:\Users\soongjy\SunwayMart\src\assets', (err: any) => {
      if (err) throw err;
      console.log('File was copied to destination');
    });*/
  }

  deleteBanner(banner:Banner){

  }
}
