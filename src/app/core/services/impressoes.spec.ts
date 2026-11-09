import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ImpressoesService } from './impressoes';

describe('ImpressoesService', () => {
  let service: ImpressoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ImpressoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
