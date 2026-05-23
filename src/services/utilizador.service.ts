import { AppDataSource } from '../database/data-source.js';
import { Utilizador } from '../models/utilizador.entity.js';
import type { CreateUtilizadorDto } from '../dtos/utilizador/create-utilizador.dto.js';
import type { UtilizadorResponseDto } from '../dtos/utilizador/utilizador-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class UtilizadorService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Utilizador); }

    async criar(utilizadorData: CreateUtilizadorDto, utilizadorIdLogado: number): Promise<UtilizadorResponseDto> {
        try {
            if (!utilizadorData.nome || utilizadorData.nome.trim().length === 0) {
                throw new Error('Nome do utilizador é obrigatório');
            }
            if (!utilizadorData.email || utilizadorData.email.trim().length === 0) {
                throw new Error('Email do utilizador é obrigatório');
            }
            if (!utilizadorData.password || utilizadorData.password.length < 6) {
                throw new Error('Password do utilizador deve ter pelo menos 6 caracteres');
            }

            const utilizador = this.repo.create(utilizadorData);
            const saved = await this.repo.save(utilizador);

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            );

            return saved;
        } catch (error) {
            console.error('Erro ao criar utilizador:', error);
            throw error;
        }
    }

    async obter(utilizadorId: number): Promise<UtilizadorResponseDto> {
        try {
            if (utilizadorId <= 0) throw new Error('ID de utilizador inválido');
            const utilizador = await this.repo.findOne({ where: { id: utilizadorId } });
            if (!utilizador) throw new Error('Utilizador não encontrado');
            return utilizador;
        } catch (error) {
            console.error('Erro ao obter utilizador:', error);
            throw error;
        }
    }

    async listar(): Promise<UtilizadorResponseDto[]> {
        try {
            return await this.repo.find();
        } catch (error) {
            console.error('Erro ao listar utilizadores:', error);
            throw error;
        }
    }

    async atualizar(utilizadorId: number, utilizadorData: CreateUtilizadorDto, utilizadorIdLogado: number): Promise<UtilizadorResponseDto> {
        try {
            const anterior = await this.obter(utilizadorId);
            const atualizado = await this.repo.save({ ...anterior, ...utilizadorData, id: utilizadorId });

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                utilizadorId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            );

            return atualizado;
        } catch (error) {
            console.error('Erro ao atualizar utilizador:', error);
            throw error;
        }
    }

    async apagar(utilizadorId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const anterior = await this.obter(utilizadorId);
            await this.repo.softDelete(utilizadorId);

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                utilizadorId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar utilizador:', error);
            throw error;
        }
    }
}
