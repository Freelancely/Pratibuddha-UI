import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAccess(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAccess(state.url);
  }

  private checkAccess(currentUrl: string): boolean {
    const token = this.authService.getToken();
    const role = localStorage.getItem('role');

    console.log('✅ AuthGuard - token:', !!token, 'role:', role, 'url:', currentUrl);

    if (!token) {
      console.log('🚨 NO TOKEN - to login');
      this.router.navigate(['/pages/login']);
      return false;
    }

    if (['Admin', 'SuperAdmin'].includes(role || '')) {
      console.log('✅ ACCESS GRANTED!');
      return true;
    }

    this.router.navigate(['/home/electronics']);
    return false;
  }
}
