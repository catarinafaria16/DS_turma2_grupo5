import { AppDataSource } from '../database/data-source.js';
import { Alergia } from '../models/alergia.entity.js';
import type { CreateAlergiaDto } from '../dtos/alergia/create-alergia.dto.js';
import type { AlergiaResponseDto } from '../dtos/alergia/alergia-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class AlergiaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Alergia); }

    async criar(alergiaData: CreateAlergiaDto, utilizadorIdLogado: number): Promise<AlergiaResponseDto> {
        try {
            if (alergiaData.anamnese_id <= 0) throw new Error('ID de anamnese deve ser válido');
            if (!alergiaData.descricao || alergiaData.descricao.trim().length === 0) {
                throw new Error('Descrição da alergia é obrigatória');
            }
            if (!alergiaData.intensidade_crise) throw new Error('Intensidade das crises é obrigatória');
            if (!alergiaData.frequencia_crise || alergiaData.frequencia_crise.trim().length === 0) {
                throw new Error('Frequência das crises é obrigatória');
            }

            const alergia = this.repo.create(alergiaData);
            const saved = await this.repo.save(alergia);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'alergia', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as AlergiaResponseDto;
        } catch (error) {
            console.error('Erro ao criar alergia:', error);
            throw error;
        }
    }

    // kept for backward compat with controller
    async registarAlergia(
        _utenteId: number,
        descricao: string,
        intensidade_crise: string,
        frequencia_crise: string,
        utilizadorIdLogado: number
    ): Promise<AlergiaResponseDto> {
        return this.criar({ anamnese_id: _utenteId, descricao, intensidade_crise: intensidade_crise as any, frequencia_crise }, utilizadorIdLogado);
    }

    async obter(alergiaId: number): Promise<AlergiaResponseDto> {
        try {
            if (alergiaId <= 0) throw new Error('ID de alergia inválido');
            const alergia = await this.repo.findOne({ where: { id: alergiaId } });
            if (!alergia) throw new Error('Alergia não encontrada');
            return alergia as unknown as AlergiaResponseDto;
        } catch (error) {
            console.error('Erro ao obter alergia:', error);
            throw error;
        }
    }

    async listar(): Promise<AlergiaResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as AlergiaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alergias:', error);
            throw error;
        }
    }

    async listarAlergias(anamneseId: number): Promise<AlergiaResponseDto[]> {
        try {
            if (anamneseId <= 0) return await this.listar();
            return await this.listarPorAnamnese(anamneseId);
        } catch (error) {
            console.error('Erro ao listar alergias:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number): Promise<AlergiaResponseDto[]> {
        try {
            if (anamneseId <= 0) throw new Error('ID de anamnese inválido');
            const result = await this.repo.find({ where: { anamnese_id: anamneseId } });
            return result as unknown as AlergiaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alergias por anamnese:', error);
            throw error;
        }
    }

    async atualizar(alergiaId: number, alergiaData: CreateAlergiaDto, utilizadorIdLogado: number): Promise<AlergiaResponseDto> {
        try {
            const anterior = await this.obter(alergiaId);
            const atualizada = await this.repo.save({ ...anterior, ...alergiaData, id: alergiaId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'alergia', alergiaId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as AlergiaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar alergia:', error);
            throw error;
        }
    }
}
