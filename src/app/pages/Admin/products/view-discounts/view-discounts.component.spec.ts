import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ViewDiscountsComponent } from './view-discounts.component';

describe('ViewDiscountsComponent', () => {
  let component: ViewDiscountsComponent;
  let fixture: ComponentFixture<ViewDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ViewDiscountsComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
