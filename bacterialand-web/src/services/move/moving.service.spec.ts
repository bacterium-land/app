import { TestBed } from '@angular/core/testing';

import { MovingService } from './moving.service';

describe('MovingService', () => {
  let service: MovingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
