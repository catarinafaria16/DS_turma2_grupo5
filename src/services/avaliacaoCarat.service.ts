/*
 * ============================================================
 * avaliacaoCarat.service.ts — Serviço do modelo do questionário CARAT
 * ============================================================
 *
 * Este service gere os modelos (templates) do questionário CARAT.
 * Normalmente existe apenas uma versão ativa do questionário (versão 1),
 * que é criada automaticamente quando o servidor arranca pela primeira vez.
 *
 * A distinção entre AvaliacaoCarat (modelo) e RespostaCarat (resposta):
 *   - AvaliacaoCarat: o formulário em branco — as perguntas e opções
 *   - RespostaCarat: um preenchimento do formulário por um utente
 *
 * Este service é acessível por qualquer utilizador autenticado (médicos e utentes).
 */
import { AppDataSource } from '../database/data-source.js';
import { AvaliacaoCarat } from '../models/avaliacaoCarat.entity.js';
import type { CreateAvaliacaoCaratDto } from '../dtos/avaliacaoCarat/create-avaliacaoCarat.dto.js';
import type { AvaliacaoCaratResponseDto } from '../dtos/avaliacaoCarat/avaliacaoCarat-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';

export class AvaliacaoCaratService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(AvaliacaoCarat); }

    async criar(avaliacaoData: CreateAvaliacaoCaratDto, utilizador: UtilizadorAutenticado): Promise<AvaliacaoCaratResponseDto> {
        try {
            if (avaliacaoData.versao <= 0) {
                throw new Error('Versao da avaliacao deve ser maior que zero');
            }

            const avaliacao = this.repo.create(avaliacaoData);
            const saved = await this.repo.save(avaliacao);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'avaliacao_carat',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as AvaliacaoCaratResponseDto;
        } catch (error) {
            console.error('Erro ao criar avaliacao CARAT:', error);
            throw error;
        }
    }

    async obter(avaliacaoId: number): Promise<AvaliacaoCaratResponseDto> {
        try {
            if (avaliacaoId <= 0) {
                throw new Error('ID de avaliacao invalido');
            }

            const avaliacao = await this.repo.findOne({ where: { id: avaliacaoId } });
            if (!avaliacao) {
                throw new Error('Avaliacao CARAT nao encontrada');
            }

            return avaliacao as AvaliacaoCaratResponseDto;
        } catch (error) {
            console.error('Erro ao obter avaliacao CARAT:', error);
            throw error;
        }
    }

    async listar(): Promise<AvaliacaoCaratResponseDto[]> {
        try {
            return await this.repo.find() as AvaliacaoCaratResponseDto[];
        } catch (error) {
            console.error('Erro ao listar avaliacoes CARAT:', error);
            throw error;
        }
    }

    async atualizar(
        avaliacaoId: number,
        avaliacaoData: CreateAvaliacaoCaratDto,
        utilizador: UtilizadorAutenticado
    ): Promise<AvaliacaoCaratResponseDto> {
        try {
            const anterior = await this.obter(avaliacaoId);
            const atualizada = await this.repo.save({ ...anterior, ...avaliacaoData, id: avaliacaoId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'avaliacao_carat',
                avaliacaoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as AvaliacaoCaratResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar avaliacao CARAT:', error);
            throw error;
        }
    }
}
