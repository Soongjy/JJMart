import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BannerService } from 'src/app/services/banner.service';
import { Banner } from 'src/app/Banner';

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.css']
})
export class ManageBannersComponent implements OnInit {
  banners!:Banner[]
  page!: string;
  title!: string;
  image!: string;

  constructor(private _snackBar: MatSnackBar, private bannerService: BannerService) { }

  ngOnInit(): void {
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
      this._snackBar.open("Please fill in your image", "Close", {
        duration: 2000
      });
    }else{
      const newBanner = {
        page: "this.page",
        title :"this.title",
        image: "this.image",
      }

      this.page = '';
      this.title = '';
      this.image = '';

      console.log(newBanner)
    }
  }
}
