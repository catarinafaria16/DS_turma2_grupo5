import { AppDataSource } from '../database/data-source.js';
import { Exame } from '../models/exame.entity.js';
import type { CreateExameDto } from '../dtos/exame/create-exame.dto.js';
import type { ExameResponseDto } from '../dtos/exame/exame-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class ExameService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Exame); }

    async criar(exameData: CreateExameDto, utilizadorIdLogado: number): Promise<ExameResponseDto> {
        try {
            if (exameData.prescricao_id <= 0) throw new Error('ID de prescrição deve ser válido');

            const exame = this.repo.create(exameData);
            const saved = await this.repo.save(exame);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'exame', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as ExameResponseDto;
        } catch (error) {
            console.error('Erro ao criar exame:', error);
            throw error;
        }
    }

    async obter(exameId: number): Promise<ExameResponseDto> {
        try {
            if (exameId <= 0) throw new Error('ID de exame inválido');
            const exame = await this.repo.findOne({ where: { id: exameId } });
            if (!exame) throw new Error('Exame não encontrado');
            return exame as unknown as ExameResponseDto;
        } catch (error) {
            console.error('Erro ao obter exame:', error);
            throw error;
        }
    }

    async listar(): Promise<ExameResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as ExameResponseDto[];
        } catch (error) {
            console.error('Erro ao listar exames:', error);
            throw error;
        }
    }

    async listarPorPrescricao(prescricaoId: number): Promise<ExameResponseDto[]> {
        try {
            if (prescricaoId <= 0) throw new Error('ID de prescrição inválido');
            const result = await this.repo.find({ where: { prescricao_id: prescricaoId } });
            return result as unknown as ExameResponseDto[];
        } catch (error) {
            console.error('Erro ao listar exames por prescrição:', error);
            throw error;
        }
    }

    async atualizar(exameId: number, exameData: CreateExameDto, utilizadorIdLogado: number): Promise<ExameResponseDto> {
        try {
            const anterior = await this.obter(exameId);
            const atualizado = await this.repo.save({ ...anterior, ...exameData, id: exameId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'exame', exameId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizado)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as unknown as ExameResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar exame:', error);
            throw error;
        }
    }
}
