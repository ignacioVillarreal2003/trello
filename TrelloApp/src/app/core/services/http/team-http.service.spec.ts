import { TestBed } from '@angular/core/testing';

import { TeamHttpService } from './team-http.service';

describe('TeamHttpService', () => {
  let service: TeamHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
