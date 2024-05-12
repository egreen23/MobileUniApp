import { TestBed } from '@angular/core/testing';

import { RecensioneMatService } from './recensione-mat.service';

describe('RecensioneMatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecensioneMatService = TestBed.get(RecensioneMatService);
    expect(service).toBeTruthy();
  });
});
