import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { ImageService } from '../services/image.service';
import { Image } from '../Image';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  images:Image[]=[];
  aboutUsImage!: string;
  aboutUsInfo!: string;


  constructor(private companyService: CompanyService,private imageService:ImageService) { }

  ngOnInit(): void {

    this.companyService.getCompanyInfo(1).subscribe(company=>{
      this.aboutUsImage = company.aboutUsImage;
      this.aboutUsInfo = company.aboutUsInfo;
    })

    this.imageService.getImages().subscribe((images)=>{
      for(var image of images){
        if (image.page=='About Us Banner'){
          this.images.push(image)
        }
      }
    })
  }

}
