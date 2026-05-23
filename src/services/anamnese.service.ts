import { AppDataSource } from '../database/data-source.js';
import { Anamnese } from '../models/anamnese.entity.js';
import type { CreateAnamneseDto } from '../dtos/anamnese/create-anamnese.dto.js';
import type { AnamneseResponseDto } from '../dtos/anamnese/anamnese-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class AnamneseService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Anamnese); }

    async criar(anamneseData: CreateAnamneseDto, utilizadorIdLogado: number): Promise<AnamneseResponseDto> {
        try {
            if (anamneseData.utente_id <= 0) throw new Error('ID do utente deve ser válido');

            const anamnese = this.repo.create(anamneseData);
            const saved = await this.repo.save(anamnese);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'anamnese', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as AnamneseResponseDto;
        } catch (error) {
            console.error('Erro ao criar anamnese:', error);
            throw error;
        }
    }

    async obter(anamneseId: number): Promise<AnamneseResponseDto> {
        try {
            if (anamneseId <= 0) throw new Error('ID de anamnese inválido');
            const anamnese = await this.repo.findOne({ where: { id: anamneseId } });
            if (!anamnese) throw new Error('Anamnese não encontrada');
            return anamnese as unknown as AnamneseResponseDto;
        } catch (error) {
            console.error('Erro ao obter anamnese:', error);
            throw error;
        }
    }

    async listar(): Promise<AnamneseResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as AnamneseResponseDto[];
        } catch (error) {
            console.error('Erro ao listar anamneses:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<AnamneseResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente inválido');
            const result = await this.repo.find({ where: { utente_id: utenteId } });
            return result as unknown as AnamneseResponseDto[];
        } catch (error) {
            console.error('Erro ao listar anamneses por utente:', error);
            throw error;
        }
    }

    async atualizar(anamneseId: number, anamneseData: CreateAnamneseDto, utilizadorIdLogado: number): Promise<AnamneseResponseDto> {
        try {
            const anterior = await this.obter(anamneseId);
            const atualizada = await this.repo.save({ ...anterior, ...anamneseData, id: anamneseId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'anamnese', anamneseId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizada)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as unknown as AnamneseResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar anamnese:', error);
            throw error;
        }
    }
}
