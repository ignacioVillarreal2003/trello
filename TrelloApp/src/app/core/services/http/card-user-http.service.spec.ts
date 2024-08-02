import { TestBed } from '@angular/core/testing';

import { CardUserHttpService } from './card-user-http.service';

describe('CardUserHttpService', () => {
  let service: CardUserHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardUserHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
