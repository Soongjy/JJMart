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
  bannerId!:number;

  editTargetPage!: string;
  editTitle!:string;
  editImage?: string;
  existingImage!: string;

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
      this.ngOnInit();
      
      setTimeout(() => {
        this._snackBar.open(newBanner.title + ' Added!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 100);
      
      this.page = '';
      this.title = '';
      this.image = '';
    }
  }

  fetchBanners() {
    this.bannerService.getBanners().subscribe((banners) => {
      this.banners = banners;
      this.dataSource = new MatTableDataSource<Banner>(this.banners);
      this.dataSource.paginator = this.paginator;
    });
  }

  fileChangedEdit() {
    const inputElement: HTMLInputElement = document.getElementById(
      'editImage'
    ) as HTMLInputElement;
    this.editImage = 'assets/' + inputElement.files![0].name;
  }

  deleteBanner(event:any) {
    this.bannerId = event.target.dataset.sectionvalue;
    this.bannerService.deleteBanner(this.bannerId).subscribe();
    setTimeout(() => {
      this._snackBar.open(' deleted!', 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    }, 100);
  }
  
  editBanner(event: any) {
    this.bannerId = event.target.dataset.sectionvalue;
    this.bannerService.getBanner(this.bannerId).subscribe((banner) => {
      this.editTargetPage = banner.page;
      this.editTitle = banner.title;
      this.existingImage = banner.image;
    });
  }

  updateBannerChanges(){
    if(!this.editTargetPage){
      this._snackBar.open("Please fill in your target page", "Close", {
        duration: 2000
      });
    }else if(!this.editTitle){
      this._snackBar.open("Please fill in your title", "Close", {
        duration: 2000
      })
    }else{
      const updateBanner = {
        page: this.editTargetPage,
        title :this.editTitle,
        image :this.editImage == null ? this.existingImage : this.editImage,
        id:this.bannerId,
      };

      if (this.editImage != null) {
        this.fileChangedEdit();
      }

      this.bannerService.updateBanner(updateBanner).subscribe(()=>{
        setTimeout(() => {
          this._snackBar.open( updateBanner.title + ' updated!', 'Close', {
            duration: 2000,
          });
          this.ngOnInit();
        }, 100);
      })
    }
  }
}
