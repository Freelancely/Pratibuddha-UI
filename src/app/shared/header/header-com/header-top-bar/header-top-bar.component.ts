import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';

@Component({
  selector: 'app-header-top-bar',
  templateUrl: './header-top-bar.component.html',
  styleUrls: ['./header-top-bar.component.scss'],
  standalone: false
})
export class HeaderTopBarComponent {
  public isActive: string = '';

  // ✅ NEW: Track login status
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  handleActive = (type: string) => {
    if (type === this.isActive) {
      this.isActive = '';
    } else {
      this.isActive = type;
    }
  };

  // ✅ NEW: Handle Login click
  onLogin() {
    this.router.navigate(['pages/login']);
  }

  // ✅ UPDATED: Handle Logout
  onLogout() {
    this.authService.logout();
    localStorage.clear();
    this.toastr.success('Logged out successfully!', 'Success');
    this.router.navigate(['pages/login']);
  }
}
