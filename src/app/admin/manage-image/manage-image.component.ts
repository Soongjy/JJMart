import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Image } from 'src/app/Image';
import { ImageService } from 'src/app/services/image.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-manage-image',
  templateUrl: './manage-image.component.html',
  styleUrls: ['./manage-image.component.css']
})
export class ManageImageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'page', 'title', 'image','actions'];
  dataSource = new MatTableDataSource<Image>();

  images:Image[] = [];
  page!: string;
  title!: string;
  image!: string;
  imageUrl!: string;
  imageId!:number;
  newImage!:Image;

  i:number=0;
  editTargetPage!: string;
  editTitle!:string;
  deleteTitle!:string;
  editImage!: string;
  existingImageUrl!: string;

  searchTerm!:any;
  myControl = new FormControl<string | Image>('');
  options: Image[] = [];
  filteredOptions!: Observable<Image[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _snackBar: MatSnackBar, private imageService: ImageService) { }

  ngOnInit(): void {
    this.fetchImages();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const page = typeof value === 'string' ? value : value?.page;
        return page ? this._filter(page as string) : this.options.slice();
      }),
    );
  }

  displayFn(image: Image): string {
    return image && image.page ? image.page : '';
  }

  private _filter(page: string): Image[] {
    const filterValue = page.toLowerCase();

    return this.options.filter(option => option.page.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if(!this.page){
      this._snackBar.open("Please fill in your target page", "Close", {
        duration: 2000
      });
    }else if(!this.title){
      this._snackBar.open("Please fill in your title", "Close", {
        duration: 2000
      });
    }else if(!this.image && !this.imageUrl){
      this._snackBar.open("Please select your image", "Close", {
        duration: 2000
      });
    }else if(this.image && this.imageUrl){
      this._snackBar.open("Please insert either Image or Url", "Close", {
        duration: 2000
      });
    }else{
      var cont = 1
      for(var image of this.images){
        if (this.page == "Homepage Banner"){
          continue;
        }else if (this.page == image.page){
          this._snackBar.open("This Page has already reach the image number limit", "Close", {
            duration: 2000
          });
          cont = 0
        }
      }
      
      if(cont == 1){
        var inputElement: HTMLInputElement = document.getElementById(
          'image'
        )! as HTMLInputElement;
        
        if(this.image){
          this.newImage = {
            page: this.page,
            title : this.title,
            image : 'assets/' + inputElement.files![0].name,
          }
        }else{
          this.newImage = {
            page: this.page,
            title : this.title,
            image :this.imageUrl
          }
        }

        this.imageService.addImage(this.newImage).subscribe((images:Image) => this.images.push(images));
        this.ngOnInit();
        
        setTimeout(() => {
          this._snackBar.open(this.newImage.title + ' Added!', 'Close', {
            duration: 2000,
          });
          this.ngOnInit();
        }, 100);
        
        this.page = '';
        this.title = '';
        this.image = '';
        this.imageUrl = '';
      }
    }
  }

  fetchImages() {
    this.imageService.getImages().subscribe((images) => {
      this.images = images;
      this.dataSource = new MatTableDataSource<Image>(this.images);
      this.dataSource.paginator = this.paginator;
      this.options =images;
    });
  }

  fileChangedEdit() {
    try{
    const inputElement: HTMLInputElement = document.getElementById(
      'editImage'
    ) as HTMLInputElement;
    this.editImage = 'assets/' + inputElement.files![0].name;
    this.existingImageUrl = this.editImage;
    }
    catch{
      this.editImage=null!
    }
  }

  deleteConfirmation(event:any){
    this.imageId = event.target.dataset.sectionvalue;
    this.imageService.getImage(this.imageId).subscribe((image) => {
      this.deleteTitle = image.title;
    });
  }

  deleteImage() {
    this.imageService.deleteImage(this.imageId).subscribe();
    setTimeout(() => {
      this._snackBar.open(this.deleteTitle +' deleted!', 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    }, 100);
  }
  
  editImages(event: any) {
    this.imageId = event.target.dataset.sectionvalue;
    this.imageService.getImage(this.imageId).subscribe((image) => {
      this.editTargetPage = image.page;
      this.editTitle = image.title;
      this.existingImageUrl = image.image;
    });
  }

  updateImageChanges(){
    if(!this.editTargetPage){
      this._snackBar.open("Please fill in your target page", "Close", {
        duration: 2000
      });
    }else if(!this.editTitle){
      this._snackBar.open("Please fill in your title", "Close", {
        duration: 2000
      })
    }else if(!this.editImage&&!this.existingImageUrl){
      this._snackBar.open("Please insert an Image", "Close", {
        duration: 2000
      })
      
    }else{

      if (this.editImage != null && this.existingImageUrl== null) {
        this.fileChangedEdit();
      }
      
      const updateImage = {
        page: this.editTargetPage,
        title :this.editTitle,
        image :this.existingImageUrl != '' ? this.existingImageUrl : this.editImage,
        id:this.imageId,
      };


      this.imageService.updateImage(updateImage).subscribe(()=>{
        setTimeout(() => {
          this._snackBar.open( updateImage.title + ' updated!', 'Close', {
            duration: 2000,
          });
          this.ngOnInit();
        }, 100);
      })
      this.page = '';
      this.title = '';
      this.image = '';
      this.imageUrl = '';
    }
  }

  search(){
    if(this.searchTerm){
      this.imageService.getImages().subscribe((images) => {
        this.images = images.filter( images =>
          (images.page.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||images.id==this.searchTerm)
          )
      });
    }else{
      this.imageService.getImages().subscribe((images) => {
        this.images = images;
      });
    }
    this.dataSource = new MatTableDataSource<Image>(this.images);
    this.dataSource.paginator = this.paginator;
  }  
}
