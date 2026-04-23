import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DiscountsService } from './discounts.service';

describe('DiscountsService', () => {
  let service: DiscountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DiscountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
