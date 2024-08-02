import { TestBed } from '@angular/core/testing';

import { CommentCommunicationServiceService } from './comment-communication-service.service';

describe('CommentCommunicationServiceService', () => {
  let service: CommentCommunicationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentCommunicationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
