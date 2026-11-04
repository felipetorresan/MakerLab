import { TestBed } from '@angular/core/testing';
import { Impressoes } from './impressoes';

describe('Impressoes', () => {
  let service: Impressoes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Impressoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
