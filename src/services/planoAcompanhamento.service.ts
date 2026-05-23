import { AppDataSource } from '../database/data-source.js';
import { PlanoAcompanhamento } from '../models/planoAcompanhamento.entity.js';
import type { CreatePlanoAcompanhamentoDto } from '../dtos/planoAcompanhamento/create-planoAcompanhamento.dto.js';
import type { PlanoAcompanhamentoResponseDto } from '../dtos/planoAcompanhamento/planoAcompanhamento-response.dto.js';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class PlanoAcompanhamentoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(PlanoAcompanhamento); }

    async criar(planoData: CreatePlanoAcompanhamentoDto, utilizadorIdLogado: number): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            if (planoData.medico_id <= 0 || planoData.utente_id <= 0) {
                throw new Error('IDs de médico e utente devem ser válidos');
            }
            if (planoData.data_inicio >= planoData.data_fim) {
                throw new Error('Data de início deve ser anterior à data de fim');
            }

            const plano = this.repo.create(planoData);
            const saved = await this.repo.save(plano);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'plano_acompanhamento', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao criar plano de acompanhamento:', error);
            throw error;
        }
    }

    async obter(planoId: number): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            if (planoId <= 0) throw new Error('ID de plano inválido');
            const plano = await this.repo.findOne({ where: { id: planoId } });
            if (!plano) throw new Error('Plano de acompanhamento não encontrado');
            return plano as unknown as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao obter plano de acompanhamento:', error);
            throw error;
        }
    }

    async listar(): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as PlanoAcompanhamentoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar planos de acompanhamento:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente inválido');
            const result = await this.repo.find({ where: { utente_id: utenteId } });
            return result as unknown as PlanoAcompanhamentoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar planos por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            if (medicoId <= 0) throw new Error('ID do médico inválido');
            const result = await this.repo.find({ where: { medico_id: medicoId } });
            return result as unknown as PlanoAcompanhamentoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar planos por médico:', error);
            throw error;
        }
    }

    async atualizar(planoId: number, planoData: CreatePlanoAcompanhamentoDto, utilizadorIdLogado: number): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            const anterior = await this.obter(planoId);
            const atualizado = await this.repo.save({ ...anterior, ...planoData, id: planoId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'plano_acompanhamento', planoId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizado)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as unknown as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar plano de acompanhamento:', error);
            throw error;
        }
    }

    async atualizarEstado(planoId: number, novoEstado: EstadoPlanoAcompanhamento, utilizadorIdLogado: number): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            const anterior = await this.obter(planoId);
            const atualizado = await this.repo.save({ ...anterior, id: planoId, estado: novoEstado });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'plano_acompanhamento', planoId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizado)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as unknown as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar estado do plano:', error);
            throw error;
        }
    }
}
