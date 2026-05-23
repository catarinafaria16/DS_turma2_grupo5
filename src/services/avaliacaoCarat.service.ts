import { AppDataSource } from '../database/data-source.js';
import { AvaliacaoCarat } from '../models/avaliacaoCarat.entity.js';
import type { CreateAvaliacaoCaratDto } from '../dtos/avaliacaoCarat/create-avaliacaoCarat.dto.js';
import type { AvaliacaoCaratResponseDto } from '../dtos/avaliacaoCarat/avaliacaoCarat-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class AvaliacaoCaratService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(AvaliacaoCarat); }

    async criar(avaliacaoData: CreateAvaliacaoCaratDto, utilizadorIdLogado: number): Promise<AvaliacaoCaratResponseDto> {
        try {
            if (avaliacaoData.versao <= 0) throw new Error('Versão da avaliação deve ser maior que zero');

            const avaliacao = this.repo.create(avaliacaoData);
            const saved = await this.repo.save(avaliacao);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'avaliacao_carat', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as AvaliacaoCaratResponseDto;
        } catch (error) {
            console.error('Erro ao criar avaliação CARAT:', error);
            throw error;
        }
    }

    async obter(avaliacaoId: number): Promise<AvaliacaoCaratResponseDto> {
        try {
            if (avaliacaoId <= 0) throw new Error('ID de avaliação inválido');
            const avaliacao = await this.repo.findOne({ where: { id: avaliacaoId } });
            if (!avaliacao) throw new Error('Avaliação CARAT não encontrada');
            return avaliacao as unknown as AvaliacaoCaratResponseDto;
        } catch (error) {
            console.error('Erro ao obter avaliação CARAT:', error);
            throw error;
        }
    }

    async listar(): Promise<AvaliacaoCaratResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as AvaliacaoCaratResponseDto[];
        } catch (error) {
            console.error('Erro ao listar avaliações CARAT:', error);
            throw error;
        }
    }

    async atualizar(avaliacaoId: number, avaliacaoData: CreateAvaliacaoCaratDto, utilizadorIdLogado: number): Promise<AvaliacaoCaratResponseDto> {
        try {
            const anterior = await this.obter(avaliacaoId);
            const atualizada = await this.repo.save({ ...anterior, ...avaliacaoData, id: avaliacaoId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'avaliacao_carat', avaliacaoId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as AvaliacaoCaratResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar avaliação CARAT:', error);
            throw error;
        }
    }
}
