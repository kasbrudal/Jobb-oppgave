import { TestBed } from '@angular/core/testing';

import { SelectedCountService } from './selected-count.service';

describe('SelectedCountService', () => {
  let service: SelectedCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
