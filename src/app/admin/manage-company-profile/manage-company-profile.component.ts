import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-manage-company-profile',
  templateUrl: './manage-company-profile.component.html',
  styleUrls: ['./manage-company-profile.component.css']
})
export class ManageCompanyProfileComponent implements OnInit {

  companyLogoPath!: string;
  aboutUsImagePath!: string;
  existingCompanyLogo!: string;
  existingAboutUsImage!: string;
  company!: Company;


  // companyLogo!: string;
  // aboutUsImage!: string;
  aboutUsInfo_1!: string;
  aboutUsInfo_2!: string;
  address!: string;
  contactNum!: string;
  googleMaps!: string;
  email!: string;
  businessHours!: string;

  constructor(private companyService: CompanyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchCompanyDetails();
  }

  fetchCompanyDetails(){
    this.companyService.getCompanyInfo(1).subscribe((company)=>{
      this.existingCompanyLogo = company.companyLogo;
      this.existingAboutUsImage = company.aboutUsImage;
      this.aboutUsInfo_1 = company.aboutUsInfo_1;
      this.aboutUsInfo_2 = company.aboutUsInfo_2;
      this.address = company.address;
      this.contactNum = company.contactNum;
      this.googleMaps = company.googleMaps;
      this.email = company.email;
      this.businessHours = company.businessHours;
    });

  }

  fileChangedLogo() {
    const companyLogo: HTMLInputElement = document.getElementById(
      'companyLogo'
    ) as HTMLInputElement;
    this.companyLogoPath = 'assets/' + companyLogo.files![0].name;
  }

  fileChangedAboutUs() {
    const aboutUsImage: HTMLInputElement = document.getElementById(
      'aboutUsImage'
    ) as HTMLInputElement;
    this.aboutUsImagePath = 'assets/' + aboutUsImage.files![0].name;
  }
  

  updateCompanyDetails(){


    const updateCompany = {
      companyLogo: this.companyLogoPath ==null ? this.existingCompanyLogo : this.companyLogoPath,
      aboutUsImage: this.aboutUsImagePath ==null ? this.existingAboutUsImage : this.aboutUsImagePath,
      aboutUsInfo_1: this.aboutUsInfo_1,
      aboutUsInfo_2: this.aboutUsInfo_2,
      address: this.address,
      contactNum: this.contactNum,
      googleMaps: this.googleMaps,
      email: this.email,
      businessHours: this.businessHours,
      id: 1,
    };

    if (this.companyLogoPath != null) {
      this.fileChangedLogo();
    }

    

    if (this.aboutUsImagePath != null) {
      this.fileChangedAboutUs();
    }

    this.companyService.updateCompanyInfo(updateCompany).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open('Company details updated!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 100);
    });
    
  }

}
