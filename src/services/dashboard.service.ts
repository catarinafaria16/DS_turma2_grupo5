export interface EvolucaoScore {
    data: Date;
    score: number;
    interpretacao: string;
}

export interface ResumoAvaliacaoCarat {
    id: number;
    data: Date;
    score: number;
    interpretacao: string;
    recomendacao: string;
}

export interface AlertaAtivo {
    id: number;
    tipo: string;
    estado: string;
    prioridade: string;
    data_criacao: Date;
}

export interface DashboardUtenteDto {
    utente_id: number;
    estado_doenca: string | null;        // RF025
    evolucao_scores: EvolucaoScore[];    // RF026
    limiar_controlo: number;             // RF026
    historico_avaliacoes: ResumoAvaliacaoCarat[]; // RF027
    alertas_ativos: AlertaAtivo[];       // RF028
    recomendacoes: string[];             // RF029
}

export class DashboardService {

    // RF025-RF029: Dashboard pessoal do Utente
    async obterDashboardUtente(utenteId: number): Promise<DashboardUtenteDto> {
        if (utenteId <= 0) {
            throw new Error('ID de utente inválido');
        }

        // TODO: buscar avaliações CARAT do utente na BD
        // TODO: calcular evolução de scores
        // TODO: buscar alertas ativos do utente
        // TODO: extrair recomendações da última avaliação

        return {
            utente_id: utenteId,
            estado_doenca: null,
            evolucao_scores: [],
            limiar_controlo: 21,
            historico_avaliacoes: [],
            alertas_ativos: [],
            recomendacoes: []
        };
    }
}
