import { AppDataSource } from '../database/data-source.js';
import { Medicacao } from '../models/medicacao.entity.js';
import type { CreateMedicacaoDto } from '../dtos/medicacao/create-medicacao.dto.js';
import type { MedicacaoResponseDto } from '../dtos/medicacao/medicacao-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class MedicacaoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Medicacao); }

    async criar(medicacaoData: CreateMedicacaoDto, utilizadorIdLogado: number): Promise<MedicacaoResponseDto> {
        try {
            if (medicacaoData.prescricao_id <= 0) throw new Error('ID de prescrição deve ser válido');
            if (!medicacaoData.nome || medicacaoData.nome.trim().length === 0) {
                throw new Error('Nome da medicação é obrigatório');
            }

            const medicacao = this.repo.create(medicacaoData);
            const saved = await this.repo.save(medicacao);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'medicacao', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as MedicacaoResponseDto;
        } catch (error) {
            console.error('Erro ao criar medicação:', error);
            throw error;
        }
    }

    async obter(medicacaoId: number): Promise<MedicacaoResponseDto> {
        try {
            if (medicacaoId <= 0) throw new Error('ID de medicação inválido');
            const medicacao = await this.repo.findOne({ where: { id: medicacaoId } });
            if (!medicacao) throw new Error('Medicação não encontrada');
            return medicacao as unknown as MedicacaoResponseDto;
        } catch (error) {
            console.error('Erro ao obter medicação:', error);
            throw error;
        }
    }

    async listar(): Promise<MedicacaoResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as MedicacaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicações:', error);
            throw error;
        }
    }

    async listarPorPrescricao(prescricaoId: number): Promise<MedicacaoResponseDto[]> {
        try {
            if (prescricaoId <= 0) throw new Error('ID de prescrição inválido');
            const result = await this.repo.find({ where: { prescricao_id: prescricaoId } });
            return result as unknown as MedicacaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicações por prescrição:', error);
            throw error;
        }
    }

    async atualizar(medicacaoId: number, medicacaoData: CreateMedicacaoDto, utilizadorIdLogado: number): Promise<MedicacaoResponseDto> {
        try {
            const anterior = await this.obter(medicacaoId);
            const atualizada = await this.repo.save({ ...anterior, ...medicacaoData, id: medicacaoId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'medicacao', medicacaoId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as MedicacaoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar medicação:', error);
            throw error;
        }
    }
}
