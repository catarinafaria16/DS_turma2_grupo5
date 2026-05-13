import type { CreateRespostaCaratDto } from '../dtos/respostaCarat/create-respostaCarat.dto.js';
import type { RespostaCaratResponseDto } from '../dtos/respostaCarat/respostaCarat-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class RespostaCaratService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        respostaData: CreateRespostaCaratDto,
        utilizadorIdLogado: number
    ): Promise<RespostaCaratResponseDto> {
        try {
            if (respostaData.avaliacao_id <= 0 || respostaData.utente_id <= 0) {
                throw new Error('IDs de avaliação e utente devem ser válidos');
            }

            const novaResposta: RespostaCaratResponseDto = {
                id: Math.random(),
                ...respostaData,
                score_total: 0, // TODO: calcular a partir das respostas
                interpretacao: '', // TODO: calcular com base no score
                recomendacao_automatica: '' // TODO: gerar recomendação
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'resposta_carat',
                novaResposta.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaResposta)
            );

            return novaResposta;
        } catch (error) {
            console.error('Erro ao criar resposta CARAT:', error);
            throw error;
        }
    }

    async obter(respostaId: number): Promise<RespostaCaratResponseDto> {
        try {
            if (respostaId <= 0) {
                throw new Error('ID de resposta inválido');
            }

            const resposta: RespostaCaratResponseDto = {
                id: respostaId,
                avaliacao_id: 0,
                utente_id: 0,
                data_avaliacao: new Date(),
                r1: 'NAO' as any,
                r2: 'NAO' as any,
                r3: 'NAO' as any,
                r4: 'NAO' as any,
                r5: 'NAO' as any,
                r6: 'NAO' as any,
                r7: 'NAO' as any,
                r8: 'NAO' as any,
                r9: 'NAO' as any,
                r10: 'SIM' as any,
                score_total: 0,
                interpretacao: '',
                recomendacao_automatica: ''
            };

            return resposta;
        } catch (error) {
            console.error('Erro ao obter resposta CARAT:', error);
            throw error;
        }
    }

    async listar(): Promise<RespostaCaratResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar respostas CARAT:', error);
            throw error;
        }
    }

    async listarPorAvaliacao(avaliacaoId: number): Promise<RespostaCaratResponseDto[]> {
        try {
            if (avaliacaoId <= 0) {
                throw new Error('ID de avaliação inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar respostas por avaliação:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<RespostaCaratResponseDto[]> {
        try {
            if (utenteId <= 0) {
                throw new Error('ID do utente inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar respostas por utente:', error);
            throw error;
        }
    }

    async atualizar(
        respostaId: number,
        respostaData: CreateRespostaCaratDto,
        utilizadorIdLogado: number
    ): Promise<RespostaCaratResponseDto> {
        try {
            const respostaAnterior = await this.obter(respostaId);
            const respostaAtualizada: RespostaCaratResponseDto = {
                ...respostaAnterior,
                ...respostaData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'resposta_carat',
                respostaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(respostaAnterior),
                JSON.stringify(respostaAtualizada)
            );

            return respostaAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar resposta CARAT:', error);
            throw error;
        }
    }

    async apagar(respostaId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const respostaAnterior = await this.obter(respostaId);
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'resposta_carat',
                respostaId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(respostaAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar resposta CARAT:', error);
            throw error;
        }
    }
}
