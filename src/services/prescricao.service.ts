import type { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto.js';
import type { PrescricaoResponseDto } from '../dtos/prescricao/prescricao-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class PrescricaoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        prescricaoData: CreatePrescricaoDto,
        utilizadorIdLogado: number
    ): Promise<PrescricaoResponseDto> {
        try {
            if (prescricaoData.medico_id <= 0 || prescricaoData.utente_id <= 0) {
                throw new Error('IDs de médico e utente devem ser válidos');
            }
            if (prescricaoData.data_emissao >= prescricaoData.data_validade) {
                throw new Error('Data de validade deve ser posterior à data de emissão');
            }

            const novaPrescricao: PrescricaoResponseDto = {
                id: Math.random(),
                ...prescricaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'prescricao',
                novaPrescricao.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaPrescricao)
            );

            return novaPrescricao;
        } catch (error) {
            console.error('Erro ao criar prescrição:', error);
            throw error;
        }
    }

    async obter(prescricaoId: number): Promise<PrescricaoResponseDto> {
        try {
            if (prescricaoId <= 0) {
                throw new Error('ID de prescrição inválido');
            }

            const prescricao: PrescricaoResponseDto = {
                id: prescricaoId,
                medico_id: 0,
                utente_id: 0,
                tipo: 'NORMAL' as any,
                data_emissao: new Date(),
                data_validade: new Date(),
                estado: 'PENDENTE' as any,
                assinatura: ''
            };

            return prescricao;
        } catch (error) {
            console.error('Erro ao obter prescrição:', error);
            throw error;
        }
    }

    async listar(): Promise<PrescricaoResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar prescrições:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<PrescricaoResponseDto[]> {
        try {
            if (utenteId <= 0) {
                throw new Error('ID do utente inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar prescrições por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<PrescricaoResponseDto[]> {
        try {
            if (medicoId <= 0) {
                throw new Error('ID do médico inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar prescrições por médico:', error);
            throw error;
        }
    }

    async atualizar(
        prescricaoId: number,
        prescricaoData: CreatePrescricaoDto,
        utilizadorIdLogado: number
    ): Promise<PrescricaoResponseDto> {
        try {
            const prescricaoAnterior = await this.obter(prescricaoId);
            const prescricaoAtualizada: PrescricaoResponseDto = {
                ...prescricaoAnterior,
                ...prescricaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'prescricao',
                prescricaoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(prescricaoAnterior),
                JSON.stringify(prescricaoAtualizada)
            );

            return prescricaoAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar prescrição:', error);
            throw error;
        }
    }

    async apagar(prescricaoId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const prescricaoAnterior = await this.obter(prescricaoId);
            const prescricaoEliminada = { ...prescricaoAnterior, deleted_at: new Date() };
            // TODO: UPDATE prescricao SET deleted_at = NOW() WHERE id = prescricaoId
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'prescricao',
                prescricaoId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(prescricaoAnterior),
                JSON.stringify(prescricaoEliminada)
            );
        } catch (error) {
            console.error('Erro ao apagar prescrição:', error);
            throw error;
        }
    }
}
