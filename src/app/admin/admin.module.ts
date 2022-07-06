import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageBannersComponent } from './manage-banners/manage-banners.component';



@NgModule({
  declarations: [
    AdminpanelComponent,
    AdmindashboardComponent,
    AdminComponent,
    ManageBannersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
