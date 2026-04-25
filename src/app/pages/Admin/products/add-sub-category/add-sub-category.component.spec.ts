import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

import { AddSubCategoryComponent } from './add-sub-category.component';

describe('AddSubCategoryComponent', () => {
  let component: AddSubCategoryComponent;
  let fixture: ComponentFixture<AddSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddSubCategoryComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
