import { AppDataSource } from '../database/data-source.js';
import { Sintoma } from '../models/sintoma.entity.js';
import type { CreateSintomaDto } from '../dtos/sintoma/create-sintoma.dto.js';
import type { SintomaResponseDto } from '../dtos/sintoma/sintoma-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class SintomaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Sintoma); }

    async criar(sintomaData: CreateSintomaDto, utilizadorIdLogado: number): Promise<SintomaResponseDto> {
        try {
            if (sintomaData.utente_id <= 0) throw new Error('ID do utente deve ser válido');
            if (!sintomaData.descricao || sintomaData.descricao.trim().length === 0) {
                throw new Error('Descrição do sintoma é obrigatória');
            }

            const sintoma = this.repo.create(sintomaData);
            const saved = await this.repo.save(sintoma);

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'sintoma', saved.id,
                OperacaoAuditoria.CRIACAO, null, JSON.stringify(saved)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as unknown as SintomaResponseDto;
        } catch (error) {
            console.error('Erro ao criar sintoma:', error);
            throw error;
        }
    }

    async obter(sintomaId: number): Promise<SintomaResponseDto> {
        try {
            if (sintomaId <= 0) throw new Error('ID de sintoma inválido');
            const sintoma = await this.repo.findOne({ where: { id: sintomaId } });
            if (!sintoma) throw new Error('Sintoma não encontrado');
            return sintoma as unknown as SintomaResponseDto;
        } catch (error) {
            console.error('Erro ao obter sintoma:', error);
            throw error;
        }
    }

    async listar(): Promise<SintomaResponseDto[]> {
        try {
            const result = await this.repo.find();
            return result as unknown as SintomaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar sintomas:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<SintomaResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente inválido');
            const result = await this.repo.find({ where: { utente_id: utenteId }, order: { data_registo: 'DESC' } });
            return result as unknown as SintomaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar sintomas por utente:', error);
            throw error;
        }
    }

    async atualizar(sintomaId: number, sintomaData: CreateSintomaDto, utilizadorIdLogado: number): Promise<SintomaResponseDto> {
        try {
            const anterior = await this.obter(sintomaId);
            const atualizado = await this.repo.save({ ...anterior, ...sintomaData, id: sintomaId });

            this.auditoriaService.registarAuditoria(
                utilizadorIdLogado, 'sintoma', sintomaId,
                OperacaoAuditoria.ALTERACAO, JSON.stringify(anterior), JSON.stringify(atualizado)
            ).catch(e => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as unknown as SintomaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar sintoma:', error);
            throw error;
        }
    }
}
