import { TestBed } from '@angular/core/testing';

import { TeamCommunicationService } from './team-communication.service';

describe('TeamCommunicationService', () => {
  let service: TeamCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
