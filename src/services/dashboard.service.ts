import { AppDataSource } from '../database/data-source.js';
import { Utente } from '../models/utente.entity.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

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
    estado_doenca: string | null;
    evolucao_scores: EvolucaoScore[];
    limiar_controlo: number;
    historico_avaliacoes: ResumoAvaliacaoCarat[];
    alertas_ativos: AlertaAtivo[];
    recomendacoes: string[];
}

export class DashboardService {
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }

    private async validarAcessoDashboard(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });

        if (!utente) {
            throw new Error('Utente nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== utilizador.id) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar o dashboard de outro utente');
            }
            return utente;
        }

        throw new Error('Perfil nao reconhecido');
    }

    // RF025-RF029: Dashboard pessoal do Utente
    async obterDashboardUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<DashboardUtenteDto> {
        if (utenteId <= 0) {
            throw new Error('ID de utente invalido');
        }

        await this.validarAcessoDashboard(utenteId, utilizador);

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
