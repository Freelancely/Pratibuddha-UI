import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  imports: [CommonModule],
  standalone: true
})
export class ConfirmEmailComponent implements OnInit {
  status: string | null = null;
  message: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.message = params['message'];

      if (this.status === 'success') {
        this.toastrService.success('Email verified successfully! You can now log in.', 'Success', {
          timeOut: 5000,
          positionClass: 'toast-top-center'
        });
      } else if (this.status === 'failed') {
        this.toastrService.error(
          this.message || 'Email verification failed. Please try again or contact support.',
          'Verification Failed',
          {
            timeOut: 7000,
            positionClass: 'toast-top-center'
          }
        );
      }
    });
  }

  // Optional: Method to navigate to login programmatically
  navigateToLogin(): void {
    this.router.navigate(['/pages/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/pages/register']);
  }
}
