import { NgModule} from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from "../product/product.component";
import { AdminComponent } from "./admin.component";

import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AdminpanelComponent } from "./adminpanel/adminpanel.component";
import { ManageProductComponent } from "./manage-product/manage-product.component";



const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', component: AdmindashboardComponent },
            { path: 'manageproduct', component: ManageProductComponent},
        ],
        
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class AdminRoutingModule{}