import { TestBed } from '@angular/core/testing';

import { DatatasimaService } from './datatasima.service';

describe('DatatasimaService', () => {
  let service: DatatasimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatatasimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
