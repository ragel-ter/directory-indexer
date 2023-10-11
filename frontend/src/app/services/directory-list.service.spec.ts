import { TestBed } from '@angular/core/testing';

import { DirectoryListService } from './directory-list.service';

describe('DirectoryListService', () => {
  let service: DirectoryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectoryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
