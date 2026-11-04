import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoImpressao } from './manutencao-impressao';

describe('ManutencaoImpressao', () => {
  let component: ManutencaoImpressao;
  let fixture: ComponentFixture<ManutencaoImpressao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoImpressao],
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoImpressao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
