import { AppDataSource } from '../database/data-source.js';
import { MedicacaoHabitual } from '../models/medicacaoHabitual.entity.js';
import type { CreateMedicacaoHabitualDto } from '../dtos/medicacaoHabitual/create-medicacaoHabitual.dto.js';
import type { MedicacaoHabitualResponseDto } from '../dtos/medicacaoHabitual/medicacaoHabitual-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class MedicacaoHabitualService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(MedicacaoHabitual); }

    async criar(medicacaoData: CreateMedicacaoHabitualDto, utilizadorIdLogado: number): Promise<MedicacaoHabitualResponseDto> {
        try {
            if (medicacaoData.anamnese_id <= 0) throw new Error('ID de anamnese deve ser válido');
            if (!medicacaoData.nome || medicacaoData.nome.trim().length === 0) {
                throw new Error('Nome da medicação habitual é obrigatório');
            }

            const medicacao = this.repo.create(medicacaoData);
            const saved = await this.repo.save(medicacao);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'medicacao_habitual', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as MedicacaoHabitualResponseDto;
        } catch (error) {
            console.error('Erro ao criar medicação habitual:', error);
            throw error;
        }
    }

    async obter(medicacaoHabitualId: number): Promise<MedicacaoHabitualResponseDto> {
        try {
            if (medicacaoHabitualId <= 0) throw new Error('ID de medicação habitual inválido');
            const medicacao = await this.repo.findOne({ where: { id: medicacaoHabitualId } });
            if (!medicacao) throw new Error('Medicação habitual não encontrada');
            return medicacao as unknown as MedicacaoHabitualResponseDto;
        } catch (error) {
            console.error('Erro ao obter medicação habitual:', error);
            throw error;
        }
    }

    async listar(): Promise<MedicacaoHabitualResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as MedicacaoHabitualResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicações habituais:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number): Promise<MedicacaoHabitualResponseDto[]> {
        try {
            if (anamneseId <= 0) throw new Error('ID de anamnese inválido');
            const result = await this.repo.find({ where: { anamnese_id: anamneseId } });
            return result as unknown as MedicacaoHabitualResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicações habituais por anamnese:', error);
            throw error;
        }
    }

    async atualizar(medicacaoHabitualId: number, medicacaoData: CreateMedicacaoHabitualDto, utilizadorIdLogado: number): Promise<MedicacaoHabitualResponseDto> {
        try {
            const anterior = await this.obter(medicacaoHabitualId);
            const atualizada = await this.repo.save({ ...anterior, ...medicacaoData, id: medicacaoHabitualId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'medicacao_habitual', medicacaoHabitualId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as MedicacaoHabitualResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar medicação habitual:', error);
            throw error;
        }
    }
}
