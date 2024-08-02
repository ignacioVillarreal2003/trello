import { TestBed } from '@angular/core/testing';

import { CardLabelHttpService } from './card-label-http.service';

describe('CardLabelHttpService', () => {
  let service: CardLabelHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardLabelHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
