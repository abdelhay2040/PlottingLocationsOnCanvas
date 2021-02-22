import { TestBed } from '@angular/core/testing';

import { DataReaderService as DataReaderService } from './data-reader.service';

describe('DataReaderServiceService', () => {
  let service: DataReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
