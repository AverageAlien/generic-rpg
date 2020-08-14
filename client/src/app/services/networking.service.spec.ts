import { TestBed } from '@angular/core/testing';

import { NetworkingService } from './networking.service';

describe('NetworkingService', () => {
  let service: NetworkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
