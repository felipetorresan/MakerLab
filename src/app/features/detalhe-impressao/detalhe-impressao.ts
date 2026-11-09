import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Impressao3D } from '../../core/models/impressao3d';
import { ImpressoesService } from '../../core/services/impressoes';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-detalhe-impressao',
  styleUrl: './detalhe-impressao.css',
  templateUrl: './detalhe-impressao.html',
})
export class DetalheImpressao implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ImpressoesService);

  impressao: Impressao3D | null = null;
  carregando = true;
  erro = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.erro = 'Identificador da impressão não informado.';
      this.carregando = false;
      return;
    }

    this.service.getById(id).subscribe({
      next: (dados) => {
        this.impressao = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível encontrar esta impressão.';
        this.carregando = false;
      }
    });
  }
}
