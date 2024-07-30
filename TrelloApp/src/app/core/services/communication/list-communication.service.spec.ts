import { TestBed } from '@angular/core/testing';

import { ListCommunicationService } from './list-communication.service';

describe('ListCommunicationService', () => {
  let service: ListCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
