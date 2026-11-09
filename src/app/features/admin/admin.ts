import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Impressao3D } from '../../core/models/impressao3d';
import { ImpressoesService } from '../../core/services/impressoes';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  private service = inject(ImpressoesService);

  impressoes: Impressao3D[] = [];
  carregando = true;
  erro = '';
  mensagem = '';

  ngOnInit(): void {
    this.carregarImpressoes();
  }

  carregarImpressoes(): void {
    this.carregando = true;
    this.erro = '';

    this.service.getAll().subscribe({
      next: (dados) => {
        this.impressoes = dados.sort((a, b) =>
          b.dataSolicitacao.localeCompare(a.dataSolicitacao)
        );
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar as impressões. Verifique a conexão com o Firebase.';
        this.carregando = false;
      }
    });
  }

  excluir(impressao: Impressao3D): void {
    const confirmar = window.confirm(
      'Deseja realmente excluir o projeto "' + impressao.nomeProjeto + '"?'
    );

    if (!confirmar) {
      return;
    }

    this.service.delete(impressao.id).subscribe({
      next: () => {
        this.mensagem = 'Impressão excluída com sucesso.';
        this.carregarImpressoes();
      },
      error: () => {
        this.erro = 'Não foi possível excluir esta impressão.';
      }
    });
  }
}
