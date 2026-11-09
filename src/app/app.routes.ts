import { Routes } from '@angular/router';

import { Admin } from './features/admin/admin';
import { DetalheImpressao } from './features/detalhe-impressao/detalhe-impressao';
import { Home } from './features/home/home';
import { Impressoras } from './features/impressoras/impressoras';
import { ManutencaoImpressao } from './features/manutencao-impressao/manutencao-impressao';
import { Sobre } from './features/sobre/sobre';

export const routes: Routes = [
  { path: '', component: Home, title: 'MakerLab | Início' },
  { path: 'impressoes', component: Impressoras, title: 'MakerLab | Impressões' },
  { path: 'impressoes/:id', component: DetalheImpressao, title: 'MakerLab | Detalhes' },
  { path: 'admin', component: Admin, title: 'MakerLab | Administração' },
  { path: 'admin/nova', component: ManutencaoImpressao, title: 'MakerLab | Nova impressão' },
  { path: 'admin/editar/:id', component: ManutencaoImpressao, title: 'MakerLab | Editar impressão' },
  { path: 'sobre', component: Sobre, title: 'MakerLab | Sobre' },
  { path: '**', redirectTo: '' }
];
