import { TestBed } from '@angular/core/testing';

import { MaterialeService } from './materiale.service';

describe('MaterialeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialeService = TestBed.get(MaterialeService);
    expect(service).toBeTruthy();
  });
});
