import { TestBed } from '@angular/core/testing';

import { LabelHttpService } from './label-http.service';

describe('LabelHttpService', () => {
  let service: LabelHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
