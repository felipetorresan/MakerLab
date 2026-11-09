import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Impressao3D } from '../../core/models/impressao3d';
import { ImpressoesService } from '../../core/services/impressoes';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-impressoras',
  styleUrl: './impressoras.css',
  templateUrl: './impressoras.html',
})
export class Impressoras implements OnInit {
  private service = inject(ImpressoesService);

  impressoes: Impressao3D[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (dados) => {
        this.impressoes = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar as impressões.';
        this.carregando = false;
      }
    });
  }
}
