
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImpressoesService } from '../../core/services/impressoes';

@Component({
  selector: 'app-manutencao-impressao',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './manutencao-impressao.html',
  styleUrl: './manutencao-impressao.css',
})
export class ManutencaoImpressao implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ImpressoesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: string | null = null;
  salvando = false;
  carregando = false;
  erro = '';
  successMessage = '';
  infoMessage = '';

  form = this.fb.nonNullable.group({
    nomeProjeto: ['', [Validators.required, Validators.minLength(3)]],
    material: ['PLA', [Validators.required]],
    pesoGramas: [1, [Validators.required, Validators.min(1)]],
    duracaoHoras: [1, [Validators.required, Validators.min(0.1)]],
    solicitante: ['', [Validators.required]],
    dataSolicitacao: [this.dataAtual(), [Validators.required]],
    concluida: [false],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.id = id;
      this.loadImpressao(id);
    }
  }

  private dataAtual(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return ano + '-' + mes + '-' + dia;
  }

  loadImpressao(id: string): void {
    this.carregando = true;
    this.erro = '';

    this.service.getById(id).subscribe({
      next: (impressao) => {
        this.form.patchValue({
          nomeProjeto: impressao.nomeProjeto,
          material: impressao.material,
          pesoGramas: impressao.pesoGramas,
          duracaoHoras: impressao.duracaoHoras,
          solicitante: impressao.solicitante,
          dataSolicitacao: impressao.dataSolicitacao,
          concluida: impressao.concluida,
        });

        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Erro ao carregar impressão: ' + error.message;
        this.carregando = false;
      },
    });
  }

  submit(): void {
    this.erro = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const formValue = this.form.getRawValue();

    const impressaoData = {
      nomeProjeto: formValue.nomeProjeto,
      material: formValue.material,
      pesoGramas: formValue.pesoGramas,
      duracaoHoras: formValue.duracaoHoras,
      solicitante: formValue.solicitante,
      dataSolicitacao: formValue.dataSolicitacao,
      concluida: formValue.concluida,
    };

    if (this.id !== null) {
      this.service.update(this.id, impressaoData).subscribe({
        next: () => {
          this.salvando = false;
          this.successMessage = 'Impressão atualizada com sucesso!';

          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1000);
        },
        error: () => {
          this.salvando = false;
          this.erro = 'Erro ao atualizar impressão.';
        },
      });

      return;
    }

    // Cadastro de uma nova impressão
    this.service.create(impressaoData).subscribe({
      next: () => {
        this.salvando = false;
        this.successMessage = 'Impressão cadastrada com sucesso!';

        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      },
      error: () => {
        this.salvando = false;
        this.erro = 'Erro ao cadastrar impressão.';
      },
    });
  }
}

