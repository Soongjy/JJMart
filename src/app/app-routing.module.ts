import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { HomepageComponent } from './homepage/homepage.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full'},
  { path: 'home', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'contactus', component:ContactUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
