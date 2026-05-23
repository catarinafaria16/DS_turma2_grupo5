import { AppDataSource } from '../database/data-source.js';
import { Prescricao } from '../models/prescricao.entity.js';
import type { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto.js';
import type { PrescricaoResponseDto } from '../dtos/prescricao/prescricao-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class PrescricaoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Prescricao); }

    async criar(prescricaoData: CreatePrescricaoDto, utilizadorIdLogado: number): Promise<PrescricaoResponseDto> {
        try {
            if (prescricaoData.medico_id <= 0 || prescricaoData.utente_id <= 0) {
                throw new Error('IDs de médico e utente devem ser válidos');
            }

            const prescricao = this.repo.create(prescricaoData);
            const saved = await this.repo.save(prescricao);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'prescricao', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as PrescricaoResponseDto;
        } catch (error) {
            console.error('Erro ao criar prescrição:', error);
            throw error;
        }
    }

    async obter(prescricaoId: number): Promise<PrescricaoResponseDto> {
        try {
            if (prescricaoId <= 0) throw new Error('ID de prescrição inválido');
            const prescricao = await this.repo.findOne({ where: { id: prescricaoId } });
            if (!prescricao) throw new Error('Prescrição não encontrada');
            return prescricao as unknown as PrescricaoResponseDto;
        } catch (error) {
            console.error('Erro ao obter prescrição:', error);
            throw error;
        }
    }

    async listar(): Promise<PrescricaoResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as PrescricaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar prescrições:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<PrescricaoResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente inválido');
            const result = await this.repo.find({ where: { utente_id: utenteId } });
            return result as unknown as PrescricaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar prescrições por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<PrescricaoResponseDto[]> {
        try {
            if (medicoId <= 0) throw new Error('ID do médico inválido');
            const result = await this.repo.find({ where: { medico_id: medicoId } });
            return result as unknown as PrescricaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar prescrições por médico:', error);
            throw error;
        }
    }

    async atualizar(prescricaoId: number, prescricaoData: CreatePrescricaoDto, utilizadorIdLogado: number): Promise<PrescricaoResponseDto> {
        try {
            const anterior = await this.obter(prescricaoId);
            const atualizada = await this.repo.save({ ...anterior, ...prescricaoData, id: prescricaoId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'prescricao', prescricaoId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as PrescricaoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar prescrição:', error);
            throw error;
        }
    }
}
