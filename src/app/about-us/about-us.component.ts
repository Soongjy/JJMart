import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {


  aboutUsImage!: string;
  aboutUsInfo!: string;


  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {

    this.companyService.getCompanyInfo(1).subscribe(company=>{
      this.aboutUsImage = company.aboutUsImage;
      this.aboutUsInfo = company.aboutUsInfo;
    })
  }

}
