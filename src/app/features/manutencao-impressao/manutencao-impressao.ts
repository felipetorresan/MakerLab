import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImpressoesService } from '../../core/services/impressoes';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-manutencao-impressao',
  styleUrl: './manutencao-impressao.css',
  templateUrl: './manutencao-impressao.html',
})
export class ManutencaoImpressao implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ImpressoesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: string | null = null;
  carregando = false;
  salvando = false;
  erro = '';

  form = this.fb.nonNullable.group({
    nomeProjeto: ['', [Validators.required, Validators.minLength(3)]],
    material: ['PLA', Validators.required],
    pesoGramas: [1, [Validators.required, Validators.min(1)]],
    duracaoHoras: [1, [Validators.required, Validators.min(0.1)]],
    solicitante: ['', Validators.required],
    dataSolicitacao: [this.dataAtual(), Validators.required],
    concluida: [false]
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.carregarParaEdicao(this.id);
    }
  }

  private dataAtual(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return ano + '-' + mes + '-' + dia;
  }

  private carregarParaEdicao(id: string): void {
    this.carregando = true;
    this.service.getById(id).subscribe({
      next: (impressao) => {
        this.form.patchValue({
          nomeProjeto: impressao.nomeProjeto,
          material: impressao.material,
          pesoGramas: impressao.pesoGramas,
          duracaoHoras: impressao.duracaoHoras,
          solicitante: impressao.solicitante,
          dataSolicitacao: impressao.dataSolicitacao,
          concluida: impressao.concluida
        });
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível encontrar esta impressão.';
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';
    const dados = this.form.getRawValue();

    if (this.id) {
      this.service.update(this.id, dados).subscribe({
        next: () => this.finalizarSalvamento(),
        error: () => this.falharSalvamento()
      });
    } else {
      this.service.create(dados).subscribe({
        next: () => this.finalizarSalvamento(),
        error: () => this.falharSalvamento()
      });
    }
  }

  private finalizarSalvamento(): void {
    this.salvando = false;
    this.router.navigate(['/admin']);
  }

  private falharSalvamento(): void {
    this.erro = 'Não foi possível salvar os dados. Tente novamente.';
    this.salvando = false;
  }
}
