import { AppDataSource } from '../database/data-source.js';
import { RegraAlerta } from '../models/regraAlerta.entity.js';
import type { CreateRegraAlertaDto } from '../dtos/regraAlerta/create-regraAlerta.dto.js';
import type { RegraAlertaResponseDto } from '../dtos/regraAlerta/regraAlerta-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class RegraAlertaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(RegraAlerta); }

    async criar(regraData: CreateRegraAlertaDto, utilizadorIdLogado: number): Promise<RegraAlertaResponseDto> {
        try {
            if (regraData.medico_id <= 0 || regraData.administrador_id <= 0) {
                throw new Error('IDs de médico e administrador devem ser válidos');
            }

            const regra = this.repo.create(regraData);
            const saved = await this.repo.save(regra);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'regra_alerta', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as RegraAlertaResponseDto;
        } catch (error) {
            console.error('Erro ao criar regra de alerta:', error);
            throw error;
        }
    }

    async obter(regraId: number): Promise<RegraAlertaResponseDto> {
        try {
            if (regraId <= 0) throw new Error('ID de regra inválido');
            const regra = await this.repo.findOne({ where: { id: regraId } });
            if (!regra) throw new Error('Regra de alerta não encontrada');
            return regra as unknown as RegraAlertaResponseDto;
        } catch (error) {
            console.error('Erro ao obter regra de alerta:', error);
            throw error;
        }
    }

    async listar(): Promise<RegraAlertaResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as RegraAlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar regras de alerta:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<RegraAlertaResponseDto[]> {
        try {
            if (medicoId <= 0) throw new Error('ID do médico inválido');
            const result = await this.repo.find({ where: { medico_id: medicoId } });
            return result as unknown as RegraAlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar regras por médico:', error);
            throw error;
        }
    }

    async atualizar(regraId: number, regraData: CreateRegraAlertaDto, utilizadorIdLogado: number): Promise<RegraAlertaResponseDto> {
        try {
            const anterior = await this.obter(regraId);
            const atualizada = await this.repo.save({ ...anterior, ...regraData, id: regraId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'regra_alerta', regraId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as RegraAlertaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar regra de alerta:', error);
            throw error;
        }
    }

    async apagar(regraId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const anterior = await this.obter(regraId);
            await this.repo.softDelete(regraId);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'regra_alerta', regraId,
                OperacaoAuditoria.ELIMINACAO, JSON.stringify(anterior), null
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));
        } catch (error) {
            console.error('Erro ao apagar regra de alerta:', error);
            throw error;
        }
    }
}
