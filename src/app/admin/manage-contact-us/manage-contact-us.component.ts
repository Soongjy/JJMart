import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-manage-contact-us',
  templateUrl: './manage-contact-us.component.html',
  styleUrls: ['./manage-contact-us.component.css']
})
export class ManageContactUsComponent implements OnInit {

  address!: string;
  contactNum!: string;
  googleMaps!: string;
  email!: string;
  businessHours!: string;

  constructor(private companyService: CompanyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchContactUsDetails();
  }

  fetchContactUsDetails(){
    this.companyService.getContactUs(1).subscribe((contactUs)=>{
      this.address = contactUs.address;
      this.contactNum = contactUs.contactNum;
      this.googleMaps = contactUs.googleMaps;
      this.email = contactUs.email;
      this.businessHours = contactUs.businessHours;
    });

  }


  updateContactUsDetails(){
    const updateContactUs = {
      address: this.address,
      contactNum: this.contactNum,
      googleMaps: this.googleMaps,
      email: this.email,
      businessHours: this.businessHours,
      id: 1,
    };

    
    this.companyService.updateContactUs(updateContactUs).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open('Contact Us page updated!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 100);
    });
    
  }

}
