import type { CreateRegraAlertaDto } from '../dtos/regraAlerta/create-regraAlerta.dto';
import type { RegraAlertaResponseDto } from '../dtos/regraAlerta/regraAlerta-response.dto';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum';

export class RegraAlertaService {
    private auditoriaService: any; // TODO: Implementar AuditoriaService

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        regraData: CreateRegraAlertaDto,
        utilizadorIdLogado: number
    ): Promise<RegraAlertaResponseDto> {
        try {
            if (regraData.medico_id <= 0 || regraData.administrador_id <= 0) {
                throw new Error('IDs de médico e administrador devem ser válidos');
            }

            const novaRegra: RegraAlertaResponseDto = {
                id: Math.random(),
                ...regraData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'regra_alerta',
                novaRegra.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaRegra)
            );

            return novaRegra;
        } catch (error) {
            console.error('Erro ao criar regra de alerta:', error);
            throw error;
        }
    }

    async obter(regraId: number): Promise<RegraAlertaResponseDto> {
        try {
            if (regraId <= 0) {
                throw new Error('ID de regra inválido');
            }

            const regra: RegraAlertaResponseDto = {
                id: regraId,
                medico_id: 0,
                administrador_id: 0,
                categoria: 'BAIXA' as any,
                limiar_score: 0,
                valor_deteoracao: 0,
                prioridade: 'MEDIA' as any,
                data_criacao: new Date()
            };

            return regra;
        } catch (error) {
            console.error('Erro ao obter regra de alerta:', error);
            throw error;
        }
    }

    async listar(): Promise<RegraAlertaResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar regras de alerta:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<RegraAlertaResponseDto[]> {
        try {
            if (medicoId <= 0) {
                throw new Error('ID do médico inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar regras por médico:', error);
            throw error;
        }
    }

    async atualizar(
        regraId: number,
        regraData: CreateRegraAlertaDto,
        utilizadorIdLogado: number
    ): Promise<RegraAlertaResponseDto> {
        try {
            const regraAnterior = await this.obter(regraId);
            const regraAtualizada: RegraAlertaResponseDto = {
                ...regraAnterior,
                ...regraData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'regra_alerta',
                regraId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(regraAnterior),
                JSON.stringify(regraAtualizada)
            );

            return regraAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar regra de alerta:', error);
            throw error;
        }
    }

    async apagar(regraId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const regraAnterior = await this.obter(regraId);
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'regra_alerta',
                regraId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(regraAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar regra de alerta:', error);
            throw error;
        }
    }
}
