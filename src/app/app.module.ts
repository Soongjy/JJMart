import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ButtonComponent } from './button/button.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProductDetailsComponent } from './product-details/product-details.component';
=======
import { ContactUsComponent } from './contact-us/contact-us.component';
>>>>>>> 256481258f84dcec2edbf0561121c7c94784c599

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ButtonComponent,
    HomepageComponent,
    RegisterComponent,
    FooterComponent,
    SigninComponent,
<<<<<<< HEAD
    ProductDetailsComponent
=======
    ContactUsComponent
>>>>>>> 256481258f84dcec2edbf0561121c7c94784c599
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
