import { TestBed } from '@angular/core/testing';

import { ThemeCommunicationService } from './theme-communication.service';

describe('ThemeCommunicationService', () => {
  let service: ThemeCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
