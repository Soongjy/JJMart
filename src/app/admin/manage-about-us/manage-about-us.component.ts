import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-manage-about-us',
  templateUrl: './manage-about-us.component.html',
  styleUrls: ['./manage-about-us.component.css']
})
export class ManageAboutUsComponent implements OnInit {

  aboutUsInfo!: string;
  aboutUsImagePath1!: string;
  aboutUsImagePath2!: string;
  aboutUsImagePath3!: string;
  existingAboutUsImage1!: string;
  existingAboutUsImage2!: string;
  existingAboutUsImage3!: string;
  imageTitle1!: string;
  imageTitle2!: string;
  imageTitle3!: string;
  imageSubtitle1!: string;
  imageSubtitle2!: string;
  imageSubtitle3!: string;
 
  constructor(private companyService: CompanyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchAboutUsDetails();
  }

  fetchAboutUsDetails(){
    this.companyService.getAboutUs(1).subscribe((aboutus)=>{
      this.aboutUsInfo = aboutus.aboutUsInfo;
      this.existingAboutUsImage1 = aboutus.aboutUsImage1;
      this.existingAboutUsImage2 = aboutus.aboutUsImage2;
      this.existingAboutUsImage3 = aboutus.aboutUsImage3;
      this.imageTitle1 = aboutus.imageTitle1;
      this.imageTitle2 = aboutus.imageTitle2;
      this.imageTitle3 = aboutus.imageTitle3;
      this.imageSubtitle1 = aboutus.imageSubtitle1;
      this.imageSubtitle2 = aboutus.imageSubtitle2;
      this.imageSubtitle3 = aboutus.imageSubtitle3;
    });

  }

  fileChangedImage1() {
    const aboutUsImage1: HTMLInputElement = document.getElementById(
      'aboutUsImage1'
    ) as HTMLInputElement;
    this. aboutUsImagePath1 = 'assets/' + aboutUsImage1.files![0].name;
  }

  fileChangedImage2() {
    const aboutUsImage2: HTMLInputElement = document.getElementById(
      'aboutUsImage2'
    ) as HTMLInputElement;
    this.aboutUsImagePath2 = 'assets/' + aboutUsImage2.files![0].name;
  }

  fileChangedImage3() {
    const aboutUsImage3: HTMLInputElement = document.getElementById(
      'aboutUsImage3'
    ) as HTMLInputElement;
    this.aboutUsImagePath3 = 'assets/' + aboutUsImage3.files![0].name;
  }
  

  updateAboutUs(){

    const updateAboutUs = {
      aboutUsInfo: this.aboutUsInfo,
      aboutUsImage1: this.aboutUsImagePath1 ==null ? this.existingAboutUsImage1 : this.aboutUsImagePath1,
      aboutUsImage2: this.aboutUsImagePath2 ==null ? this.existingAboutUsImage2 : this.aboutUsImagePath2,
      aboutUsImage3: this.aboutUsImagePath3 ==null ? this.existingAboutUsImage3 : this.aboutUsImagePath3,
      imageTitle1: this.imageTitle1,
      imageTitle2: this.imageTitle2,
      imageTitle3: this.imageTitle3,
      imageSubtitle1: this.imageSubtitle1,
      imageSubtitle2: this.imageSubtitle2,
      imageSubtitle3: this.imageSubtitle3,
      id: 1,
    };

    if (this.aboutUsImagePath1 != null) {
      this.fileChangedImage1();
    }
    if (this.aboutUsImagePath2 != null) {
      this.fileChangedImage2();
    }
    if (this.aboutUsImagePath3 != null) {
      this.fileChangedImage3();
    }

    this.companyService.updateAboutUs(updateAboutUs).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open('About Us page updated!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 100);
    });
    
  }

}
