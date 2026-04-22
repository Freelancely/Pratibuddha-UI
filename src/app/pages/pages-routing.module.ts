import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user-services-guards/auth.guard';

// USER COMPONENTS (Public + Authenticated)
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { DynamicBlogDetailsComponent } from './blog/dynamic-blog-details/dynamic-blog-details.component';
import { CouponComponent } from './coupon/coupon.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

// ADMIN COMPONENTS (YOUR ACTUAL COMPONENTS)
import { DashboardComponent } from './Admin/Layout/dashboard/dashboard.component';
import { CategoriesComponent } from './Admin/products/categories/categories.component';

// LAYOUT COMPONENTS
import { UserLayoutComponent } from './Admin/Layout/user-layout/user-layout.component';
import { LayoutComponent } from './Admin/Layout/layout/layout.component';
import { AddSubCategoryComponent } from './Admin/products/add-sub-category/add-sub-category.component';
import { ProductsComponent } from './Admin/products/products/products.component';
import { OrderListComponent } from './Admin/products/order-list/order-list.component';
import { AddCouponComponent } from './Admin/products/add-coupon/add-coupon.component';
import { ViewCouponsComponent } from './Admin/products/view-coupons/view-coupons.component';
import { UsersComponent } from './Admin/products/users/users.component';
import { DiscountsComponent } from './Admin/products/discounts/discounts.component';
import { ViewDiscountsComponent } from './Admin/products/view-discounts/view-discounts.component';

const routes: Routes = [
  // ========================================
  // 👤 USER ROUTES (Public + Authenticated)
  // ========================================
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'about', component: AboutComponent, title: 'About Page' },
      { path: 'blog', component: BlogComponent, title: 'Blog Page' },
      { path: 'blog-grid', component: BlogGridComponent, title: 'Blog Grid Page' },
      { path: 'blog-list', component: BlogListComponent, title: 'Blog List Page' },
      { path: 'blog-details', component: BlogDetailsComponent, title: 'Blog Details Page' },
      { path: 'blog-details/:id', component: DynamicBlogDetailsComponent, title: 'Blog Details Page' },
      { path: 'coupons', component: CouponComponent, title: 'Coupon Page' },
      { path: 'contact', component: ContactComponent, title: 'Contact Page' },

      // AUTH ROUTES (Public)
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      { path: 'register', component: RegisterComponent, title: 'Register Page' },
      { path: 'forgot', component: ForgotPasswordComponent, title: 'Forgot Page' },

      // PROTECTED USER ROUTES
      { path: 'checkout', component: CheckoutComponent, title: 'Checkout Page' },
      { path: 'profile', component: ProfileComponent, title: 'Profile Page' },
      { path: 'search', component: SearchComponent, title: 'Search Page' },
      { path: 'confirm-email', component: ConfirmEmailComponent, title: 'Confirm Email Page' },

      { path: '', redirectTo: '/home/electronics', pathMatch: 'full' } // ✅ FIXED: Direct to home
    ]
  },

  // ========================================
  // 🛡️ ADMIN ROUTES (PROTECTED by AuthGuard)
  // ========================================
  {
    path: 'admin',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Admin Dashboard' },
      { path: 'categories', component: CategoriesComponent, title: 'Category Page' },
      { path: 'add-sub-category', component: AddSubCategoryComponent, title: 'Sub Category Page' },
      { path: 'products', component: ProductsComponent, title: 'Products Page' },
      { path: 'order-list', component: OrderListComponent, title: 'View Orders Page' },
      { path: 'add-coupon', component: AddCouponComponent, title: 'Add Coupon Page' },
      { path: 'view-coupons', component: ViewCouponsComponent, title: 'Coupon Page' },
      { path: 'users-list', component: UsersComponent, title: 'View Users Page' },
      { path: 'add-discount', component: DiscountsComponent, title: 'Add Discounts Page' },
      { path: 'discount-list', component: ViewDiscountsComponent, title: 'View Discounts Page' },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
