import { NgModule} from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from "../product/product.component";
import { AdminComponent } from "./admin.component";

import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AdminpanelComponent } from "./adminpanel/adminpanel.component";
import { ManageBannersComponent } from "./manage-banners/manage-banners.component";
import { ManageProductComponent } from "./manage-product/manage-product.component";
import { ManageUserComponent } from "./manage-user/manage-user.component";



const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', component: AdmindashboardComponent },
            { path: 'manage-banners', component: ManageBannersComponent},
            { path: 'manageproduct', component: ManageProductComponent},
            { path: 'manageuser', component: ManageUserComponent},
        ],
        
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class AdminRoutingModule{}