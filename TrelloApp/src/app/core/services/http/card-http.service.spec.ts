import { TestBed } from '@angular/core/testing';

import { CardHttpService } from './card-http.service';

describe('CardHttpService', () => {
  let service: CardHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
