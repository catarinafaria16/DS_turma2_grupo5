/*
 * ============================================================
 * dashboard.service.ts — Serviço do painel de controlo clínico
 * ============================================================
 *
 * Este service agrega informação de várias fontes para compor o
 * "dashboard" (painel de controlo) de um utente.
 *
 * O dashboard apresenta de forma consolidada:
 *   - Estado atual da doença (interpretação do último score CARAT)
 *   - Evolução histórica dos scores CARAT ao longo do tempo
 *   - Alertas ativos (não fechados) do utente
 *   - Recomendações automáticas baseadas no último score
 *   - Sintomas registados pelo utente
 *
 * O limiar de controlo é 21 pontos — acima disto a doença está bem controlada.
 */
import { AppDataSource } from '../database/data-source.js';
import { Utente } from '../models/utente.entity.js';
import { RespostaCarat } from '../models/respostaCarat.entity.js';
import { Alerta } from '../models/alerta.entity.js';
import { Sintoma } from '../models/sintoma.entity.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { obterMedicoIdAutenticado } from './perfilAcesso.helper.js';

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
    notas: string | undefined;
}

export interface SintomaTempo {
    id: number;
    descricao: string;
    intensidade: string;
    duracao: string;
    data_registo: Date;
}

export interface DashboardUtenteDto {
    utente_id: number;
    estado_doenca: string | null;
    evolucao_scores: EvolucaoScore[];
    limiar_controlo: number;
    historico_avaliacoes: ResumoAvaliacaoCarat[];
    alertas_ativos: AlertaAtivo[];
    recomendacoes: string[];
    sintomas: SintomaTempo[];
}

export class DashboardService {
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }
    private get respostaCaratRepo() { return AppDataSource.getRepository(RespostaCarat); }
    private get alertaRepo() { return AppDataSource.getRepository(Alerta); }
    private get sintomaRepo() { return AppDataSource.getRepository(Sintoma); }

    private async validarAcessoDashboard(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });

        if (!utente) {
            throw new Error('Utente nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
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

        const respostas = await this.respostaCaratRepo.find({
            where: { utente_id: utenteId },
            order: { data_avaliacao: 'DESC' }
        });

        const alertas = await this.alertaRepo.find({
            where: { utente_id: utenteId },
            order: { data_criacao: 'DESC' }
        });

        const sintomas = await this.sintomaRepo.find({
            where: { utente_id: utenteId },
            order: { data_registo: 'DESC' }
        });

        const ultimaResposta = respostas[0];

        const alertas_ativos = alertas
            .filter(a => a.estado !== EstadoAlerta.FECHADO)
            .map(a => ({
                id: a.id,
                tipo: a.tipo,
                estado: a.estado,
                prioridade: a.prioridade,
                data_criacao: a.data_criacao,
                notas: a.notas
            }));

        return {
            utente_id: utenteId,
            estado_doenca: ultimaResposta?.interpretacao ?? null,
            evolucao_scores: respostas.map(r => ({
                data: r.data_avaliacao,
                score: r.score_total,
                interpretacao: r.interpretacao
            })),
            limiar_controlo: 21,
            historico_avaliacoes: respostas.map(r => ({
                id: r.id,
                data: r.data_avaliacao,
                score: r.score_total,
                interpretacao: r.interpretacao,
                recomendacao: r.recomendacao_automatica
            })),
            alertas_ativos,
            recomendacoes: ultimaResposta ? [ultimaResposta.recomendacao_automatica] : [],
            sintomas: sintomas.map(s => ({
                id: s.id,
                descricao: s.descricao,
                intensidade: s.intensidade,
                duracao: s.duracao,
                data_registo: s.data_registo
            }))
        };
    }
}
