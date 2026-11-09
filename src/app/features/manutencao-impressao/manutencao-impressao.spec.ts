import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ManutencaoImpressao } from './manutencao-impressao';

describe('ManutencaoImpressao', () => {
  let component: ManutencaoImpressao;
  let fixture: ComponentFixture<ManutencaoImpressao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoImpressao],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoImpressao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
