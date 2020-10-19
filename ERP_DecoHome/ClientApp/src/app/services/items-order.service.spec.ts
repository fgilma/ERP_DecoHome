import { TestBed } from '@angular/core/testing';

import { ItemsOrderService } from './items-order.service';

describe('ItemsOrderService', () => {
  let service: ItemsOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
