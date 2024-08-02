import { TestBed } from '@angular/core/testing';

import { LabelCommunicationService } from './label-communication.service';

describe('LabelCommunicationService', () => {
  let service: LabelCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
