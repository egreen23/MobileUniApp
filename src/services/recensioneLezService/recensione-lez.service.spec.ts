import { TestBed } from '@angular/core/testing';

import { RecensioneLezService } from './recensione-lez.service';

describe('RecensioneLezService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecensioneLezService = TestBed.get(RecensioneLezService);
    expect(service).toBeTruthy();
  });
});
