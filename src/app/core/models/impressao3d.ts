export interface Impressao3D {
    id: string;
    nomeProjeto: string;
    material: string;
    pesoGramas: number;
    duracaoHoras: number;
    solicitante: string;
    dataSolicitacao: string;
    concluida: boolean;
}
