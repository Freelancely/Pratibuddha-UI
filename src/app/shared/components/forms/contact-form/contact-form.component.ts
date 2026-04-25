import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnquiryService, IEnquiry } from 'src/app/shared/services/enquiry.service';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    standalone: false
})
export class ContactFormComponent implements OnInit {
  public contactForm!: FormGroup;
  public formSubmitted = false;

  constructor(
    private toastrService: ToastrService,
    private enquiryService: EnquiryService
  ) { }

  ngOnInit () {
    this.contactForm = new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      subject:new FormControl(null,Validators.required),
      message:new FormControl(null,Validators.required),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      const enquiryData: IEnquiry = {
        personName: this.contactForm.value.name,
        personEmail: this.contactForm.value.email,
        enquiryDescription: `Subject: ${this.contactForm.value.subject}\n\nMessage: ${this.contactForm.value.message}`,
        // personPhoneNumber and relatedProductId are optional
      };

      this.enquiryService.addEnquiry(enquiryData).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastrService.success(`Message sent successfully`);
            this.contactForm.reset();
            this.formSubmitted = false;
          } else {
            this.toastrService.error(response.message || `Failed to send message`);
          }
        },
        error: (err) => {
          console.error('Enquiry Error:', err);
          this.toastrService.error(err.error?.message || `Something went wrong. Please try again later.`);
        }
      });
    }
  }

  get name() { return this.contactForm.get('name') }
  get email() { return this.contactForm.get('email') }
  get subject() { return this.contactForm.get('subject') }
  get message() { return this.contactForm.get('message') }
}
