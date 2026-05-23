import { AppDataSource } from '../database/data-source.js';
import { Alerta } from '../models/alerta.entity.js';
import type { CreateAlertaDto } from '../dtos/alerta/create-alerta.dto.js';
import type { AlertaResponseDto } from '../dtos/alerta/alerta-response.dto.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class AlertaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Alerta); }

    async criar(alertaData: CreateAlertaDto, utilizadorIdLogado: number): Promise<AlertaResponseDto> {
        try {
            if (alertaData.utente_id <= 0 || alertaData.medico_id <= 0 || alertaData.regra_id <= 0) {
                throw new Error('IDs de utente, médico e regra devem ser válidos');
            }

            const alerta = this.repo.create({
                ...alertaData,
                data_atualizacao_estado: new Date()
            });
            const saved = await this.repo.save(alerta);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'alerta', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao criar alerta:', error);
            throw error;
        }
    }

    async obter(alertaId: number): Promise<AlertaResponseDto> {
        try {
            if (alertaId <= 0) throw new Error('ID de alerta inválido');
            const alerta = await this.repo.findOne({ where: { id: alertaId } });
            if (!alerta) throw new Error('Alerta não encontrado');
            return alerta as unknown as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao obter alerta:', error);
            throw error;
        }
    }

    async listar(): Promise<AlertaResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as AlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alertas:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<AlertaResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente inválido');
            const result = await this.repo.find({ where: { utente_id: utenteId } });
            return result as unknown as AlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alertas por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<AlertaResponseDto[]> {
        try {
            if (medicoId <= 0) throw new Error('ID do médico inválido');
            const result = await this.repo.find({ where: { medico_id: medicoId } });
            return result as unknown as AlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alertas por médico:', error);
            throw error;
        }
    }

    async atualizarEstado(alertaId: number, novoEstado: EstadoAlerta, utilizadorIdLogado: number): Promise<AlertaResponseDto> {
        try {
            const anterior = await this.obter(alertaId);
            const atualizado = await this.repo.save({
                ...anterior,
                id: alertaId,
                estado: novoEstado,
                data_atualizacao_estado: new Date()
            });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'alerta', alertaId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizado)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as unknown as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar estado do alerta:', error);
            throw error;
        }
    }

    async adicionarNota(alertaId: number, nota: string, utilizadorIdLogado: number): Promise<AlertaResponseDto> {
        try {
            if (!nota || nota.trim().length === 0) throw new Error('Nota não pode ser vazia');

            const anterior = await this.obter(alertaId);
            const timestamp = new Date().toISOString();
            const novaNotaTexto = anterior.notas !== undefined
                ? `${anterior.notas}\n[${timestamp}] ${nota}`
                : `[${timestamp}] ${nota}`;

            const atualizado = await this.repo.save({
                ...anterior,
                id: alertaId,
                notas: novaNotaTexto,
                data_atualizacao_estado: new Date()
            });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'alerta', alertaId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizado)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as unknown as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao adicionar nota ao alerta:', error);
            throw error;
        }
    }

    async obterResumo(): Promise<{ total: number; por_estado: Record<string, number>; por_tipo: Record<string, number>; por_prioridade: Record<string, number>; }> {
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
