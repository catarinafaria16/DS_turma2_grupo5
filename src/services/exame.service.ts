import type { CreateExameDto } from '../dtos/exame/create-exame.dto.js';
import type { ExameResponseDto } from '../dtos/exame/exame-response.dto.js';
import { EstadoExame } from '../enums/EstadoExame.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class ExameService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        exameData: CreateExameDto,
        utilizadorIdLogado: number
    ): Promise<ExameResponseDto> {
        try {
            if (exameData.prescricao_id <= 0) {
                throw new Error('ID de prescrição deve ser válido');
            }

            const novoExame: ExameResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...exameData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'exame',
                novoExame.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novoExame)
            );

            return novoExame;
        } catch (error) {
            console.error('Erro ao criar exame:', error);
            throw error;
        }
    }

    async obter(exameId: number): Promise<ExameResponseDto> {
        try {
            if (exameId <= 0) {
                throw new Error('ID de exame inválido');
            }

            const exame: ExameResponseDto = {
                id: exameId,
                prescricao_id: 0,
                tipo_exame: '',
                data: new Date(),
                resultado: {},
                consentimento: false,
                estado: EstadoExame.PENDENTE
            };

            return exame;
        } catch (error) {
            console.error('Erro ao obter exame:', error);
            throw error;
        }
    }

    async listar(): Promise<ExameResponseDto[]> {
        try {
            // TODO: Buscar todos os exames na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar exames:', error);
            throw error;
        }
    }

    async listarPorPrescricao(prescricaoId: number): Promise<ExameResponseDto[]> {
        try {
            if (prescricaoId <= 0) {
                throw new Error('ID de prescrição inválido');
            }

            // TODO: Buscar exames por prescrição na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar exames por prescrição:', error);
            throw error;
        }
    }

    async atualizar(
        exameId: number,
        exameData: CreateExameDto,
        utilizadorIdLogado: number
    ): Promise<ExameResponseDto> {
        try {
            const exameAnterior = await this.obter(exameId);

            const exameAtualizado: ExameResponseDto = {
                ...exameAnterior,
                ...exameData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'exame',
                exameId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(exameAnterior),
                JSON.stringify(exameAtualizado)
            );

            return exameAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar exame:', error);
            throw error;
        }
    }

    async apagar(exameId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const exameAnterior = await this.obter(exameId);
            const exameEliminado = { ...exameAnterior, deleted_at: new Date() };
            // TODO: UPDATE exame SET deleted_at = NOW() WHERE id = exameId
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'exame',
                exameId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(exameAnterior),
                JSON.stringify(exameEliminado)
            );
        } catch (error) {
            console.error('Erro ao apagar exame:', error);
            throw error;
        }
    }
}
