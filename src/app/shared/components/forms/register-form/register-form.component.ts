import { Component, OnInit } from '@angular/core'; // Add OnInit
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms'; // Add imports
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/user-services-guards/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: false
})
export class RegisterFormComponent implements OnInit { // Add implements OnInit
  isShowPass = false;
  isShowConfirmPass = false;
  public registerForm!: FormGroup;
  public formSubmitted = false;
  loading = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() { // Change from ngOnInit() to ngOnInit
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]) // Add terms checkbox
    }, this.passwordMatchValidator as ValidatorFn); // ✅ FIXED: Cast as ValidatorFn
  }

  // ✅ FIXED: Correct ValidatorFn type
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  };

  handleShowPass() {
    this.isShowPass = !this.isShowPass;
  }

  handleShowConfirmPass() {
    this.isShowConfirmPass = !this.isShowConfirmPass;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.loading = true;

      const formData = new FormData();
      formData.append('Firstname', this.registerForm.value.firstname);
      formData.append('Lastname', this.registerForm.value.lastname);
      formData.append('Address', this.registerForm.value.address);
      formData.append('Email', this.registerForm.value.email);
      formData.append('PhoneNumber', this.registerForm.value.phoneNumber);
      formData.append('Password', this.registerForm.value.password);
      formData.append('ConfirmPassword', this.registerForm.value.confirmPassword);

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.toastrService.success('Registration successful! Please login to continue.');
          this.router.navigate(['/pages/login']);
        },
        error: (error) => {
          const message = error.error?.message || 'Registration failed. Please try again.';
          this.toastrService.error(message);
          this.loading = false;
        },
        complete: () => {
          this.registerForm.reset();
          this.formSubmitted = false;
        }
      });
    }
  }

  // Getters
  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get address() { return this.registerForm.get('address'); }
  get email() { return this.registerForm.get('email'); }
  get phoneNumber() { return this.registerForm.get('phoneNumber'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }
}
