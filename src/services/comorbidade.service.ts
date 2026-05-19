import type { CreateComorbidadeDto } from '../dtos/comorbidade/create-comorbidade.dto.js';
import type { ComorbidadeResponseDto } from '../dtos/comorbidade/comorbidade-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class ComorbidadeService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        comorbidadeData: CreateComorbidadeDto,
        utilizadorIdLogado: number
    ): Promise<ComorbidadeResponseDto> {
        try {
            if (comorbidadeData.anamnese_id <= 0) {
                throw new Error('ID de anamnese deve ser válido');
            }
            if (!comorbidadeData.descricao || comorbidadeData.descricao.trim().length === 0) {
                throw new Error('Descrição da comorbidade é obrigatória');
            }

            const novaComorbidade: ComorbidadeResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...comorbidadeData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'comorbidade',
                novaComorbidade.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaComorbidade)
            );

            return novaComorbidade;
        } catch (error) {
            console.error('Erro ao criar comorbidade:', error);
            throw error;
        }
    }

    async obter(comorbidadeId: number): Promise<ComorbidadeResponseDto> {
        try {
            if (comorbidadeId <= 0) {
                throw new Error('ID de comorbidade inválido');
            }

            const comorbidade: ComorbidadeResponseDto = {
                id: comorbidadeId,
                anamnese_id: 0,
                descricao: ''
            };

            return comorbidade;
        } catch (error) {
            console.error('Erro ao obter comorbidade:', error);
            throw error;
        }
    }

    async listar(): Promise<ComorbidadeResponseDto[]> {
        try {
            // TODO: Buscar todas as comorbidades na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar comorbidades:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number): Promise<ComorbidadeResponseDto[]> {
        try {
            if (anamneseId <= 0) {
                throw new Error('ID de anamnese inválido');
            }

            // TODO: Buscar comorbidades por anamnese na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar comorbidades por anamnese:', error);
            throw error;
        }
    }

    async atualizar(
        comorbidadeId: number,
        comorbidadeData: CreateComorbidadeDto,
        utilizadorIdLogado: number
    ): Promise<ComorbidadeResponseDto> {
        try {
            const comorbidadeAnterior = await this.obter(comorbidadeId);

            const comorbidadeAtualizada: ComorbidadeResponseDto = {
                ...comorbidadeAnterior,
                ...comorbidadeData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'comorbidade',
                comorbidadeId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(comorbidadeAnterior),
                JSON.stringify(comorbidadeAtualizada)
            );

            return comorbidadeAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar comorbidade:', error);
            throw error;
        }
    }
}
