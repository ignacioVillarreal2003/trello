import { TestBed } from '@angular/core/testing';

import { CardCommunicationService } from './card-communication.service';

describe('CardCommunicationService', () => {
  let service: CardCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
