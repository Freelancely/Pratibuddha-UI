import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isSidebarCollapsed = false;
  isMobile = window.innerWidth <= 768;
  private sidebarSubscription?: Subscription;

  constructor(private router: Router) {
  console.log('🏗️ LayoutComponent - Constructor called');
}

  ngOnInit() {
    console.log('🏗️ LayoutComponent - ngOnInit called');

    // ✅ ADD THESE 2 LINES ONLY
    if (this.router.url === '/pages/login') {
      console.log('🏗️ Layout - Skipping init on login page');
      return;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnDestroy() {
    console.log('🏗️ LayoutComponent - ngOnDestroy called');
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
