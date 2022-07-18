import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  companyLogo !:string;
  contactNum !:string;
  address !:string;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {

    this.companyService.getCompanyInfo(1).subscribe(company=>{
      this.companyLogo = company.companyLogo;
      this.contactNum = company.contactNum;
      this.address = company.address;
    })
    
  }
  //get logo


}
