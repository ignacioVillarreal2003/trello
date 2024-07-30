import { TestBed } from '@angular/core/testing';

import { UserTeamHttpService } from './user-team-http.service';

describe('UserTeamHttpService', () => {
  let service: UserTeamHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTeamHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
