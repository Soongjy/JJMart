import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';


@NgModule({
  declarations: [
    AdminpanelComponent,
    AdmindashboardComponent,
    AdminComponent,
    ManageProductComponent,
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatExpansionModule
  ]
})
export class AdminModule { }
