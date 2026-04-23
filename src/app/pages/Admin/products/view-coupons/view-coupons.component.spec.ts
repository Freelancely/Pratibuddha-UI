import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ViewCouponsComponent } from './view-coupons.component';

describe('ViewCouponsComponent', () => {
  let component: ViewCouponsComponent;
  let fixture: ComponentFixture<ViewCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ViewCouponsComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
