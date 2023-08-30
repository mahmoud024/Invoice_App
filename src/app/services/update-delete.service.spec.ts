import {TestBed} from '@angular/core/testing';

import {UpdateDeleteService} from './update-delete.service';

describe('UpdateDeleteService', () => {
  let service: UpdateDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
