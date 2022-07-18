import { Component, OnInit } from '@angular/core';
import { Company } from '../Company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

 
  address!:string;
  contactNum!:string;
  email!:string;
  businessHours!:string;
  googleMaps!:string;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {

    this.companyService.getCompanyInfo(1).subscribe(company=>{

      this.address = company.address;
      this.contactNum = company.contactNum;
      this.email = company.email;
      this.businessHours= company.businessHours;
      this.googleMaps = company.googleMaps;
    
    })
  }

}
