import { TestBed } from '@angular/core/testing';

import { Stripe.ServiceService } from './stripe.service.service';

describe('Stripe.ServiceService', () => {
  let service: Stripe.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stripe.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
