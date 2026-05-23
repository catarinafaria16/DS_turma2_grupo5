import { AppDataSource } from '../database/data-source.js';
import { Medico } from '../models/medico.entity.js';
import type { CreateMedicoDto } from '../dtos/medico/create-medico.dto.js';
import type { MedicoResponseDto } from '../dtos/medico/medico-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class MedicoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Medico); }

    async criar(medicoData: CreateMedicoDto, utilizadorIdLogado: number): Promise<MedicoResponseDto> {
        try {
            if (medicoData.utilizador_id <= 0) {
                throw new Error('ID do utilizador deve ser válido');
            }
            if (!medicoData.contacto || medicoData.contacto.trim().length === 0) {
                throw new Error('Contacto é obrigatório');
            }
            if (!medicoData.especialidade || medicoData.especialidade.trim().length === 0) {
                throw new Error('Especialidade é obrigatória');
            }

            const medico = this.repo.create(medicoData);
            const saved = await this.repo.save(medico);

            this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medico',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved;
        } catch (error) {
            console.error('Erro ao criar médico:', error);
            throw error;
        }
    }

    async obter(medicoId: number): Promise<MedicoResponseDto> {
        try {
            if (medicoId <= 0) throw new Error('ID de médico inválido');
            const medico = await this.repo.findOne({ where: { id: medicoId } });
            if (!medico) throw new Error('Médico não encontrado');
            return medico;
        } catch (error) {
            console.error('Erro ao obter médico:', error);
            throw error;
        }
    }

    async listar(): Promise<MedicoResponseDto[]> {
        try {
            return await this.repo.find();
        } catch (error) {
            console.error('Erro ao listar médicos:', error);
            throw error;
        }
    }

    async atualizar(medicoId: number, medicoData: CreateMedicoDto, utilizadorIdLogado: number): Promise<MedicoResponseDto> {
        try {
            const anterior = await this.obter(medicoId);
            const atualizado = await this.repo.save({ ...anterior, ...medicoData, id: medicoId });

            this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medico',
                medicoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado;
        } catch (error) {
            console.error('Erro ao atualizar médico:', error);
            throw error;
        }
    }

    async listarPorEspecialidade(especialidade: string): Promise<MedicoResponseDto[]> {
        try {
            return await this.repo.find({ where: { especialidade } });
        } catch (error) {
            console.error('Erro ao listar médicos por especialidade:', error);
            throw error;
        }
    }

    async apagar(medicoId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const anterior = await this.obter(medicoId);
            await this.repo.softDelete(medicoId);

            this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medico',
                medicoId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));
        } catch (error) {
            console.error('Erro ao apagar médico:', error);
            throw error;
        }
    }
}
