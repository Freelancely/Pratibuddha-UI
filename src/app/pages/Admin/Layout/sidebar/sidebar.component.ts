import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ToastrModule]
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  menuItems: MenuItem[] = [];

  private allMenuItems: MenuItem[] = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/pages/admin/dashboard' },
    {
      icon: 'fas fa-shop',
      label: 'Products',
      isOpen: false,
      children: [
        { icon: 'fas fa-layer-group', label: 'Brands', route: '/pages/admin/categories' },
        { icon: 'fas fa-layer-group', label: 'Categories', route: '/pages/admin/add-sub-category' },
        { icon: 'fas fa-layer-group', label: 'Add Products', route: '/pages/admin/products' },
      ]
    },
    { icon: 'fas fa-cart-shopping', label: 'View Orders', route: '/pages/admin/order-list' },
    {
      icon: 'fas fa-tags',
      label: 'Discount',
      isOpen: false,
      children: [
        { icon: 'fas fa-tag', label: 'Add Discount', route: '/pages/admin/add-discount' },
        { icon: 'fas fa-tags', label: 'View Discount', route: '/pages/admin/discount-list' }
      ]
    },
    {
      icon: 'fas fa-ticket',
      label: 'Coupon',
      isOpen: false,
      children: [
        { icon: 'fas fa-layer-group', label: 'Add Coupon', route: '/pages/admin/add-coupon' },
        { icon: 'fas fa-layer-group', label: 'View Coupons', route: '/pages/admin/view-coupons' }
      ]
    },
    // {
    //   icon: 'fas fa-signs-post',
    //   label: 'Banner',
    //   isOpen: false,
    //   children: [
    //     { icon: 'fas fa-layer-group', label: 'Add Banners', route: '/pages/admin/banner' },
    //     { icon: 'fas fa-layer-group', label: 'View Banners', route: '/pages/admin/banner-list' }
    //   ]
    // },
    { icon: 'fas fa-users', label: 'View Users', route: '/pages/admin/users-list' }
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.authService.onLogout$.subscribe(() => {
      this.initializeMenuItems();
    });
  }

  ngOnInit() {
    setTimeout(() => this.initializeMenuItems(), 100);
  }

  private initializeMenuItems() {
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  console.log('🔍 Sidebar init - role:', role, 'email:', email);

  if (role === 'SuperAdmin') {
    // ✅ ALL SuperAdmins get FULL menu
    this.menuItems = [...this.allMenuItems];
    console.log('✅ FULL MENU LOADED for SuperAdmin:', email);
  } else if (role === 'Admin') {
    // ✅ Limited menu for Admin role
    this.menuItems = this.allMenuItems.filter(item =>
      item.label === 'View Orders' || item.label === 'View Users'
    );
    console.log('✅ LIMITED MENU LOADED for Admin:', email);
  } else {
    // ✅ Fallback: Minimum menu for others
    console.log('🔍 Sidebar - Limited access, fallback menu');
    this.menuItems = this.allMenuItems.filter(item =>
      item.label === 'Dashboard' || item.label === 'View Orders'
    );
  }
  console.log('✅ Menu items count:', this.menuItems.length);
}

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }

  onLogout() {
    this.toastr.success('Logged out successfully!', 'Success');
    localStorage.clear();
    this.logout.emit();
    this.router.navigate(['/pages/login']);
  }
}
