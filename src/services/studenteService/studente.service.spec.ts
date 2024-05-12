import { TestBed } from '@angular/core/testing';

import { StudenteService } from './studente.service';

describe('StudenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudenteService = TestBed.get(StudenteService);
    expect(service).toBeTruthy();
  });
});
