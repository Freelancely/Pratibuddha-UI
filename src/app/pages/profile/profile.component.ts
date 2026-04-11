import { Component, OnInit } from '@angular/core';
import { ProfileService, UserProfile, Order, OrderResponse, CancelOrderResponse, ChangePasswordResponse } from '@/shared/services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {
  public genderSelectOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'others', text: 'Others' },
  ];

  userProfile: UserProfile = {
    userId: '',
    profileImageUrl: null,
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phoneNumber: '',
    role: '',
    isBanned: false
  };

  passwordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  orders: Order[] = [];
  error: string | null = null;
  successMessage: string | null = null;
  passwordError: string | null = null;
  passwordSuccessMessage: string | null = null;
  selectedFile: File | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken') || '';
    this.loadUserProfile(token);
  }

  loadUserProfile(token: string): void {
    this.profileService.getUserProfile(token).subscribe({
      next: (profile: UserProfile) => {
        this.userProfile = profile;
        this.loadOrders(token);
      },
      error: (err) => {
        this.error = 'Failed to load user profile';
        console.error('Error fetching profile:', err);
      }
    });
  }

  loadOrders(token: string): void {
    if (!this.userProfile.userId) {
      this.error = 'User ID not available';
      return;
    }

    this.profileService.viewOrders(token, this.userProfile.userId).subscribe({
      next: (response: OrderResponse) => {
        if (response.success) {
          this.orders = response.message;
          this.error = null;
        } else {
          this.error = 'Failed to load orders';
        }
      },
      error: (err) => {
        this.error = 'Failed to load orders';
        console.error('Error fetching orders:', err);
      }
    });
  }

  cancelOrder(orderId: string): void {
    const token = localStorage.getItem('authToken') || '';
    this.profileService.cancelOrder(token, orderId).subscribe({
      next: (response: CancelOrderResponse) => {
        if (response.success) {
          this.successMessage = response.message;
          this.error = null;
          this.loadOrders(token);
        } else {
          this.error = 'Failed to cancel order';
        }
      },
      error: (err) => {
        this.error = 'Failed to cancel order';
        console.error('Error cancelling order:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      this.error = 'No image selected';
      return;
    }

    const token = localStorage.getItem('authToken') || '';
    const formData = new FormData();
    formData.append('ProfileImage', this.selectedFile, this.selectedFile.name);
    formData.append('Firstname', this.userProfile.firstname);
    formData.append('Lastname', this.userProfile.lastname);
    formData.append('Address', this.userProfile.address);
    formData.append('PhoneNumber', this.userProfile.phoneNumber);

    this.profileService.updateUserProfile(token, formData).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.error = null;
        this.loadUserProfile(token);
        this.selectedFile = null;
        const fileInput = document.getElementById('profile-thumb-input') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (err) => {
        this.error = 'Failed to upload image';
        this.successMessage = null;
        console.error('Error uploading image:', err);
      }
    });
  }

  updateProfile(): void {
    const token = localStorage.getItem('authToken') || '';
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('ProfileImage', this.selectedFile, this.selectedFile.name);
    }
    formData.append('Firstname', this.userProfile.firstname);
    formData.append('Lastname', this.userProfile.lastname);
    formData.append('Address', this.userProfile.address);
    formData.append('PhoneNumber', this.userProfile.phoneNumber);

    this.profileService.updateUserProfile(token, formData).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.error = null;
        this.loadUserProfile(token);
        this.selectedFile = null;
        const fileInput = document.getElementById('profile-thumb-input') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (err) => {
        this.error = 'Failed to update profile';
        this.successMessage = null;
        console.error('Error updating profile:', err);
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.passwordError = 'New password and confirm password do not match';
      this.passwordSuccessMessage = null;
      return;
    }

    const token = localStorage.getItem('authToken') || '';
    const payload = {
      oldPassword: this.passwordForm.oldPassword,
      newPassword: this.passwordForm.newPassword,
      confirmPassword: this.passwordForm.confirmPassword
    };

    this.profileService.changePassword(token, payload).subscribe({
      next: (response: ChangePasswordResponse) => {
        if (response.success) {
          this.passwordSuccessMessage = response.message;
          this.passwordError = null;
          this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' };
        } else {
          this.passwordError = response.message || 'Failed to change password';
          this.passwordSuccessMessage = null;
        }
      },
      error: (err) => {
        this.passwordError = err.error?.message || 'Failed to change password';
        this.passwordSuccessMessage = null;
        console.error('Error changing password:', err);
      }
    });
  }

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);
  }
}
