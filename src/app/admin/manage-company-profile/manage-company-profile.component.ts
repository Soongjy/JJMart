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
  paymentOptionImagePath!: string;
  existingCompanyLogo!: string;
  existingPaymentOptionImage!: string;
  companySlogan!: string;
  company!: Company;


  constructor(private companyService: CompanyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchCompanyDetails();
  }

  fetchCompanyDetails(){
    this.companyService.getCompanyInfo(1).subscribe((company)=>{
      this.existingCompanyLogo = company.companyLogo;
      this.existingPaymentOptionImage = company.paymentOptionImage;
      this.companySlogan = company.companySlogan;
    
    });

  }

  fileChangedLogo() {
    const companyLogo: HTMLInputElement = document.getElementById(
      'companyLogo'
    ) as HTMLInputElement;
    this.companyLogoPath = 'assets/' + companyLogo.files![0].name;
  }

  fileChangedPaymentOption() {
    const paymentOptionImage: HTMLInputElement = document.getElementById(
      'paymentOptionImage'
    ) as HTMLInputElement;
    this.paymentOptionImagePath = 'assets/' + paymentOptionImage.files![0].name;
  }
  

  updateCompanyDetails(){


    const updateCompany = {
      companyLogo: this.companyLogoPath ==null ? this.existingCompanyLogo : this.companyLogoPath,
      paymentOptionImage: this.paymentOptionImagePath ==null ? this.existingPaymentOptionImage : this.paymentOptionImagePath,
      companySlogan: this.companySlogan,
      id: 1,
    };

    if (this.companyLogoPath != null) {
      this.fileChangedLogo();
    }

    if (this.paymentOptionImagePath != null) {
      this.fileChangedPaymentOption();
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
