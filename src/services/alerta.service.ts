import type { CreateAlertaDto } from '../dtos/alerta/create-alerta.dto.js';
import type { AlertaResponseDto } from '../dtos/alerta/alerta-response.dto.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { TipoAlerta } from '../enums/TipoAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';
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
            if (alertaData.utente_id <= 0 || alertaData.medico_id <= 0 || alertaData.regra_id <= 0) {
                throw new Error('IDs de utente, médico e regra devem ser válidos');
            }

            const novoAlerta: AlertaResponseDto = {
                id: Math.random(),
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
            const alerta: AlertaResponseDto = {
                id: alertaId,
                utente_id: 0,
                medico_id: 0,
                regra_id: 0,
                tipo: TipoAlerta.SCORE_BAIXO,
                estado: EstadoAlerta.NOVO,
                prioridade: PrioridadeRegraAlerta.BAIXA,
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
            return [];
        } catch (error) {
            console.error('Erro ao listar alertas:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<AlertaResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar alertas por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<AlertaResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar alertas por médico:', error);
            throw error;
        }
    }

    // RF018: Gerir o ciclo de vida do alerta (Novo → Visto → Em Seguimento → Fechado)
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

    // RF018: Registar notas ou ações associadas ao alerta
    async adicionarNota(
        alertaId: number,
        nota: string,
        utilizadorIdLogado: number
    ): Promise<AlertaResponseDto> {
        try {
            if (!nota || nota.trim().length === 0) {
                throw new Error('Nota não pode ser vazia');
            }

            const alertaAnterior = await this.obter(alertaId);
            const timestamp = new Date().toISOString();
            const novaNotaTexto = alertaAnterior.notas !== undefined
                ? `${alertaAnterior.notas}\n[${timestamp}] ${nota}`
                : `[${timestamp}] ${nota}`;

            const alertaAtualizado: AlertaResponseDto = {
                ...alertaAnterior,
                notas: novaNotaTexto,
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
            console.error('Erro ao adicionar nota ao alerta:', error);
            throw error;
        }
    }

    // RF047: Resumo agregado de alertas (endpoint específico para extração de dados)
    async obterResumo(): Promise<{
        total: number;
        por_estado: Record<string, number>;
        por_tipo: Record<string, number>;
        por_prioridade: Record<string, number>;
    }> {
        try {
            const alertas = await this.listar();
            const por_estado: Record<string, number> = {};
            const por_tipo: Record<string, number> = {};
            const por_prioridade: Record<string, number> = {};

            for (const alerta of alertas) {
                por_estado[alerta.estado] = (por_estado[alerta.estado] ?? 0) + 1;
                por_tipo[alerta.tipo] = (por_tipo[alerta.tipo] ?? 0) + 1;
                por_prioridade[alerta.prioridade] = (por_prioridade[alerta.prioridade] ?? 0) + 1;
            }

            return { total: alertas.length, por_estado, por_tipo, por_prioridade };
        } catch (error) {
            console.error('Erro ao obter resumo de alertas:', error);
            throw error;
        }
    }

   
}
