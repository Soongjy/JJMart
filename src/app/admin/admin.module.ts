import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageBannersComponent } from './manage-banners/manage-banners.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AdminpanelComponent,
    AdmindashboardComponent,
    AdminComponent,
    ManageBannersComponent,
    ManageProductComponent,
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
