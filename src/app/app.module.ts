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
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatTabsModule} from '@angular/material/tabs';
import { MatRadioButton, MatRadioModule} from '@angular/material/radio';
import { MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule} from '@angular/material/menu';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { ManageaccountComponent } from './manageaccount/manageaccount.component';
import { MiniCartComponent } from './mini-cart/mini-cart.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CartQuantityComponent } from './cart-quantity/cart-quantity.component';
import { SearchComponent } from './search/search.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderconfirmation.component';
import { AuthGuard,AdminAuthGuard,UserAuthGuard } from './services/auth-guard.service';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { SafePipe } from './safe.pipe';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ButtonComponent,
    HomepageComponent,
    RegisterComponent,
    FooterComponent,
    SigninComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    AboutUsComponent,
    AllProductsComponent,
    ProductComponent,
    CategoryComponent,
    CartComponent,
    ManageaccountComponent,
    MiniCartComponent,
    ChangepasswordComponent,
    CartQuantityComponent,
    SearchComponent,
    OrderconfirmationComponent,
    OrderHistoryComponent,
    SafePipe,
    AdminLoginComponent,

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
    MatTabsModule,
    MatRadioModule,
    MatBadgeModule,
    MatMenuModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatBottomSheetModule,
    NgChartsModule,
  ],
  providers: [AuthGuard,AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
  