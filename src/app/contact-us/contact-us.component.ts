import { Component, OnInit } from '@angular/core';
import { Company } from '../Company';
import { CompanyService } from '../services/company.service';
import { ImageService } from '../services/image.service';
import { Image } from '../Image';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  images:Image[]=[];
  imagetitle!:string;
  address!:string;
  contactNum!:string;
  email!:string;
  businessHours!:string;
  googleMaps!:string;

  constructor(
    private companyService: CompanyService,
    private imageService:ImageService) { }

  ngOnInit(): void {

    this.companyService.getCompanyInfo(1).subscribe(company=>{

      this.address = company.address;
      this.contactNum = company.contactNum;
      this.email = company.email;
      this.businessHours= company.businessHours;
      this.googleMaps = company.googleMaps;
    
    })

    this.imageService.getImages().subscribe((images)=>{
      for(var image of images){
        if (image.page=='Contact Us Banner'){
          this.images.push(image)
        }
      }
    })
  }
}
