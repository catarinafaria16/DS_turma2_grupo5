import type { CreateAvaliacaoCaratDto } from '../dtos/avaliacaoCarat/create-avaliacaoCarat.dto';
import type { AvaliacaoCaratResponseDto } from '../dtos/avaliacaoCarat/avaliacaoCarat-response.dto';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum';

export class AvaliacaoCaratService {
    private auditoriaService: any; // TODO: Implementar AuditoriaService

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        avaliacaoData: CreateAvaliacaoCaratDto,
        utilizadorIdLogado: number
    ): Promise<AvaliacaoCaratResponseDto> {
        try {
            if (avaliacaoData.versao <= 0) {
                throw new Error('Versão da avaliação deve ser maior que zero');
            }

            const novaAvaliacao: AvaliacaoCaratResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...avaliacaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'avaliacao_carat',
                novaAvaliacao.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaAvaliacao)
            );

            return novaAvaliacao;
        } catch (error) {
            console.error('Erro ao criar avaliação CARAT:', error);
            throw error;
        }
    }

    async obter(avaliacaoId: number): Promise<AvaliacaoCaratResponseDto> {
        try {
            if (avaliacaoId <= 0) {
                throw new Error('ID de avaliação inválido');
            }

            const avaliacao: AvaliacaoCaratResponseDto = {
                id: avaliacaoId,
                data_criacao: new Date(),
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: '',
                q6: '',
                q7: '',
                q8: '',
                q9: '',
                q10: '',
                r1: {},
                r2: {},
                r3: {},
                r4: {},
                r5: {},
                r6: {},
                r7: {},
                r8: {},
                r9: {},
                r10: {},
                versao: 1
            };

            return avaliacao;
        } catch (error) {
            console.error('Erro ao obter avaliação CARAT:', error);
            throw error;
        }
    }

    async listar(): Promise<AvaliacaoCaratResponseDto[]> {
        try {
            // TODO: Buscar todas as avaliações CARAT na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar avaliações CARAT:', error);
            throw error;
        }
    }

    async atualizar(
        avaliacaoId: number,
        avaliacaoData: CreateAvaliacaoCaratDto,
        utilizadorIdLogado: number
    ): Promise<AvaliacaoCaratResponseDto> {
        try {
            const avaliacaoAnterior = await this.obter(avaliacaoId);

            const avaliacaoAtualizada: AvaliacaoCaratResponseDto = {
                ...avaliacaoAnterior,
                ...avaliacaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'avaliacao_carat',
                avaliacaoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(avaliacaoAnterior),
                JSON.stringify(avaliacaoAtualizada)
            );

            return avaliacaoAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar avaliação CARAT:', error);
            throw error;
        }
    }

    async apagar(avaliacaoId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const avaliacaoAnterior = await this.obter(avaliacaoId);

            // TODO: Apagar da base de dados ou usar soft delete
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'avaliacao_carat',
                avaliacaoId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(avaliacaoAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar avaliação CARAT:', error);
            throw error;
        }
    }
}
