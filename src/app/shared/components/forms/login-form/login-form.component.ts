import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false
})
export class LoginFormComponent implements OnInit {
  isShowPass = false;
  public loginForm!: FormGroup;
  public formSubmitted = false;
  loading = false;

  constructor(
    private toastrService: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🔍 Current URL on init:', this.router.url);
    console.log('🔍 Is logged in:', this.auth.isLoggedIn());
    console.log('🔍 Is admin:', this.auth.isAdmin());

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  handleShowPass() {
    this.isShowPass = !this.isShowPass;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.auth.login({ email, password }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastrService.success(res.message || 'Login successful!');

            setTimeout(() => {
              const targetUrl = this.auth.isAdmin() ? '/pages/admin/dashboard' : '/home/beauty';

              this.router.navigate([targetUrl], { replaceUrl: true }).then(success => {
                console.log('✅ Navigation success:', success);
                console.log('🔍 Current URL after navigation:', this.router.url);

                if (success) {
                  this.loginForm.reset();
                  this.formSubmitted = false;
                } else {
                  window.location.href = targetUrl;
                }
                this.loading = false;
              });
            }, 150);
          } else {
            this.toastrService.error(res.message || 'Login failed');
            this.loading = false;
          }
        },
        error: err => {
          console.error('❌ Login error:', err);
          this.loading = false;
        }
      });
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
