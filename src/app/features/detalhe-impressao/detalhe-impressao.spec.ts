import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheImpressao } from './detalhe-impressao';

describe('DetalheImpressao', () => {
  let component: DetalheImpressao;
  let fixture: ComponentFixture<DetalheImpressao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheImpressao],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheImpressao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
