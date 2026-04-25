import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SubCategoryService } from './sub-category.service';

describe('SubCategoryService', () => {
  let service: SubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
