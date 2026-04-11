import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // ← KEEP THIS
import { ToastrModule } from 'ngx-toastr'; // ← KEEP THIS

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from './../shared/shared.module'; // ← ALREADY HAS FORMS
import { ShopModule } from '../shop/shop.module';

import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog/blog.component';
import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { DynamicBlogDetailsComponent } from './blog/dynamic-blog-details/dynamic-blog-details.component';
import { CouponComponent } from './coupon/coupon.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ContactComponent,
    BlogComponent,
    BlogGridComponent,
    BlogListComponent,
    BlogDetailsComponent,
    DynamicBlogDetailsComponent,
    CouponComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    // REMOVED: LoginFormComponent, RegisterFormComponent (ALREADY IN SharedModule)
    ForgotPasswordComponent,
    NotFoundComponent,
    CheckoutComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule, // ← HAS LoginFormComponent & RegisterFormComponent
    ShopModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // ← KEEP THIS
    ToastrModule.forRoot() // ← KEEP THIS
  ]
})
export class PagesModule { }
