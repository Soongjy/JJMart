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
  aboutUsInfo!: string;
  aboutUsImage1!: string;
  aboutUsImage2!: string;
  aboutUsImage3!: string;
  imageTitle1!: string;
  imageTitle2!: string;
  imageTitle3!: string;
  imageSubtitle1!: string;
  imageSubtitle2!: string;
  imageSubtitle3!: string;



  constructor(private companyService: CompanyService,private imageService:ImageService) { }

  ngOnInit(): void {

    this.companyService.getAboutUs(1).subscribe(aboutus=>{
      this.aboutUsInfo = aboutus.aboutUsInfo;
      this.aboutUsImage1 = aboutus.aboutUsImage1;
      this.aboutUsImage2 = aboutus.aboutUsImage2;
      this.aboutUsImage3 = aboutus.aboutUsImage3;
      this.imageTitle1 = aboutus.imageTitle1;
      this.imageTitle2 = aboutus.imageTitle2;
      this.imageTitle3 = aboutus.imageTitle3;
      this.imageSubtitle1 = aboutus.imageSubtitle1;
      this.imageSubtitle2 = aboutus.imageSubtitle2;
      this.imageSubtitle3 = aboutus.imageSubtitle3;
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
