import { TestBed } from '@angular/core/testing';

import { CardUserCommunicationService } from './card-user-communication.service';

describe('CardUserCommunicationService', () => {
  let service: CardUserCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardUserCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
