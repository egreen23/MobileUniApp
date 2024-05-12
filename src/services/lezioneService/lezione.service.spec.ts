import { TestBed } from '@angular/core/testing';

import { LezioneService } from './lezione.service';

describe('LezioneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LezioneService = TestBed.get(LezioneService);
    expect(service).toBeTruthy();
  });
});
