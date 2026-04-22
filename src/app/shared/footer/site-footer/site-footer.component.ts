import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
  standalone: false,
})
export class SiteFooterComponent {
  getYear(): number {
    return new Date().getFullYear();
  }
}

