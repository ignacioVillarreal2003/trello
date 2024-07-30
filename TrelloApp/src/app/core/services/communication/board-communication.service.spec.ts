import { TestBed } from '@angular/core/testing';

import { BoardCommunicationService } from './board-communication.service';

describe('BoardCommunicationService', () => {
  let service: BoardCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
