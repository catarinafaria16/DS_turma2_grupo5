import type { CreateAlertaDto } from '../dtos/alerta/create-alerta.dto.js';
import type { AlertaResponseDto } from '../dtos/alerta/alerta-response.dto.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { TipoAlerta } from '../enums/TipoAlerta.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class AlertaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        alertaData: CreateAlertaDto,
        utilizadorIdLogado: number
    ): Promise<AlertaResponseDto> {
        try {
            // TODO: Validar regras, utente_id e medico_id existem e regra activa
            if (alertaData.utente_id <= 0 || alertaData.medico_id <= 0 || alertaData.regra_id <= 0) {
                throw new Error('IDs de utente, médico e regra devem ser válidos');
            }

            const novoAlerta: AlertaResponseDto = {
                id: Math.random(), // TODO: Substituir por ID gerado pela BD
                ...alertaData,
                data_criacao: new Date(),
                data_atualizacao_estado: new Date()
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'alerta',
                novoAlerta.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novoAlerta)
            );

            return novoAlerta;
        } catch (error) {
            console.error('Erro ao criar alerta:', error);
            throw error;
        }
    }

    async obter(alertaId: number): Promise<AlertaResponseDto> {
        try {
            // TODO: Buscar alerta na base de dados
            const alerta: AlertaResponseDto = {
                id: alertaId,
                utente_id: 0,
                medico_id: 0,
                regra_id: 0,
                tipo: TipoAlerta.SCORE_BAIXO,
                estado: EstadoAlerta.NOVO,
                data_criacao: new Date(),
                data_atualizacao_estado: new Date()
            };
            return alerta;
        } catch (error) {
            console.error('Erro ao obter alerta:', error);
            throw error;
        }
    }

    async listar(): Promise<AlertaResponseDto[]> {
        try {
            // TODO: Buscar todos os alertas da base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar alertas:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<AlertaResponseDto[]> {
        try {
            // TODO: Filtrar alertas por utente na BD
            return [];
        } catch (error) {
            console.error('Erro ao listar alertas por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<AlertaResponseDto[]> {
        try {
            // TODO: Filtrar alertas por médico na BD
            return [];
        } catch (error) {
            console.error('Erro ao listar alertas por médico:', error);
            throw error;
        }
    }

    async atualizarEstado(
        alertaId: number,
        novoEstado: EstadoAlerta,
        utilizadorIdLogado: number
    ): Promise<AlertaResponseDto> {
        try {
            const alertaAnterior = await this.obter(alertaId);

            const alertaAtualizado: AlertaResponseDto = {
                ...alertaAnterior,
                estado: novoEstado,
                data_atualizacao_estado: new Date()
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'alerta',
                alertaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(alertaAnterior),
                JSON.stringify(alertaAtualizado)
            );

            return alertaAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar estado do alerta:', error);
            throw error;
        }
    }

    async apagar(alertaId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const alertaAnterior = await this.obter(alertaId);

            // TODO: Apagar do sistema ou usar soft delete
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'alerta',
                alertaId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(alertaAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar alerta:', error);
            throw error;
        }
    }
}
