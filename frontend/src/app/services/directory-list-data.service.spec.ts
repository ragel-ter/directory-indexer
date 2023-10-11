import { TestBed } from '@angular/core/testing';

import { DirectoryListDataService } from './directory-list-data.service';

describe('DirectoryListDataService', () => {
  let service: DirectoryListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectoryListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
