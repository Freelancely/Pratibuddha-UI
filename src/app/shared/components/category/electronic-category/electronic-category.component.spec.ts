import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ElectronicCategoryComponent } from './electronic-category.component';

describe('ElectronicCategoryComponent', () => {
  let component: ElectronicCategoryComponent;
  let fixture: ComponentFixture<ElectronicCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicCategoryComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(ElectronicCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
