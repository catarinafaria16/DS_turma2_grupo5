import { AppDataSource } from '../database/data-source.js';
import { Comorbidade } from '../models/comorbidade.entity.js';
import type { CreateComorbidadeDto } from '../dtos/comorbidade/create-comorbidade.dto.js';
import type { ComorbidadeResponseDto } from '../dtos/comorbidade/comorbidade-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class ComorbidadeService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Comorbidade); }

    async criar(comorbidadeData: CreateComorbidadeDto, utilizadorIdLogado: number): Promise<ComorbidadeResponseDto> {
        try {
            if (comorbidadeData.anamnese_id <= 0) throw new Error('ID de anamnese deve ser válido');
            if (!comorbidadeData.descricao || comorbidadeData.descricao.trim().length === 0) {
                throw new Error('Descrição da comorbidade é obrigatória');
            }

            const comorbidade = this.repo.create(comorbidadeData);
            const saved = await this.repo.save(comorbidade);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'comorbidade', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as ComorbidadeResponseDto;
        } catch (error) {
            console.error('Erro ao criar comorbidade:', error);
            throw error;
        }
    }

    async obter(comorbidadeId: number): Promise<ComorbidadeResponseDto> {
        try {
            if (comorbidadeId <= 0) throw new Error('ID de comorbidade inválido');
            const comorbidade = await this.repo.findOne({ where: { id: comorbidadeId } });
            if (!comorbidade) throw new Error('Comorbidade não encontrada');
            return comorbidade as unknown as ComorbidadeResponseDto;
        } catch (error) {
            console.error('Erro ao obter comorbidade:', error);
            throw error;
        }
    }

    async listar(): Promise<ComorbidadeResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as ComorbidadeResponseDto[];
        } catch (error) {
            console.error('Erro ao listar comorbidades:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number): Promise<ComorbidadeResponseDto[]> {
        try {
            if (anamneseId <= 0) throw new Error('ID de anamnese inválido');
            const result = await this.repo.find({ where: { anamnese_id: anamneseId } });
            return result as unknown as ComorbidadeResponseDto[];
        } catch (error) {
            console.error('Erro ao listar comorbidades por anamnese:', error);
            throw error;
        }
    }

    async atualizar(comorbidadeId: number, comorbidadeData: CreateComorbidadeDto, utilizadorIdLogado: number): Promise<ComorbidadeResponseDto> {
        try {
            const anterior = await this.obter(comorbidadeId);
            const atualizada = await this.repo.save({ ...anterior, ...comorbidadeData, id: comorbidadeId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'comorbidade', comorbidadeId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as ComorbidadeResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar comorbidade:', error);
            throw error;
        }
    }
}
