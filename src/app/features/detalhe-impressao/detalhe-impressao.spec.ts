import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DetalheImpressao } from './detalhe-impressao';

describe('DetalheImpressao', () => {
  let component: DetalheImpressao;
  let fixture: ComponentFixture<DetalheImpressao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheImpressao],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheImpressao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
