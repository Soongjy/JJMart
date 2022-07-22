import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminRoutingModule } from './admin-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { MatExpansionModule } from '@angular/material/expansion';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageCompanyProfileComponent } from './manage-company-profile/manage-company-profile.component';
import { ManageImageComponent } from './manage-image/manage-image.component';
import { ManageAboutUsComponent } from './manage-about-us/manage-about-us.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';


@NgModule({
  declarations: [
    AdminpanelComponent,
    AdmindashboardComponent,
    AdminComponent,
    ManageProductComponent,
    ManageUserComponent,
    ManageCategoriesComponent,
    ManageCompanyProfileComponent,
    ManageImageComponent,
    ManageAboutUsComponent,
    ManageContactUsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule { }
