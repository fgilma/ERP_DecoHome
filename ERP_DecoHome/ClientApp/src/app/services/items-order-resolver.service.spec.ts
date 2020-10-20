import { TestBed } from '@angular/core/testing';

import { ItemsOrderResolverService } from './items-order-resolver.service';

describe('ItemsOrderResolverService', () => {
  let service: ItemsOrderResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsOrderResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
