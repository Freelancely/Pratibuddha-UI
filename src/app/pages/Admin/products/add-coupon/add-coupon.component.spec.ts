import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AddCouponComponent } from './add-coupon.component';

describe('AddCouponComponent', () => {
  let component: AddCouponComponent;
  let fixture: ComponentFixture<AddCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddCouponComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
