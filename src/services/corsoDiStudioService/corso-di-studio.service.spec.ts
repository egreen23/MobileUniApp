import { TestBed } from '@angular/core/testing';

import { CorsoDiStudioService } from './corso-di-studio.service';

describe('CorsoDiStudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorsoDiStudioService = TestBed.get(CorsoDiStudioService);
    expect(service).toBeTruthy();
  });
});
