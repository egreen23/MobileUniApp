import { TestBed } from '@angular/core/testing';

import { InsegnamentoService } from './insegnamento.service';

describe('InsegnamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsegnamentoService = TestBed.get(InsegnamentoService);
    expect(service).toBeTruthy();
  });
});
