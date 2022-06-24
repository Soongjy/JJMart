import { NgModule} from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";

import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AdminpanelComponent } from "./adminpanel/adminpanel.component";



const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: 'admindashboard', component: AdmindashboardComponent },
        ],
        
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class AdminRoutingModule{}