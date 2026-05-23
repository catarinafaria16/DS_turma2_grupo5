import { AppDataSource } from '../database/data-source.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateUtenteDto } from '../dtos/utente/create-utente.dto.js';
import type { UtenteResponseDto } from '../dtos/utente/utente-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class UtenteService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Utente); }

    async criar(utenteData: CreateUtenteDto, utilizadorIdLogado: number): Promise<UtenteResponseDto> {
        try {
            if (utenteData.utilizador_id <= 0 || utenteData.medico_id <= 0) {
                throw new Error('IDs de utilizador e médico devem ser válidos');
            }
            if (!utenteData.morada || utenteData.morada.trim().length === 0) {
                throw new Error('Morada é obrigatória');
            }

            const utente = this.repo.create(utenteData);
            const saved = await this.repo.save(utente);

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utente',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            );

            return saved;
        } catch (error) {
            console.error('Erro ao criar utente:', error);
            throw error;
        }
    }

    async obter(utenteId: number): Promise<UtenteResponseDto> {
        try {
            if (utenteId <= 0) throw new Error('ID de utente inválido');
            const utente = await this.repo.findOne({ where: { id: utenteId } });
            if (!utente) throw new Error('Utente não encontrado');
            return utente;
        } catch (error) {
            console.error('Erro ao obter utente:', error);
            throw error;
        }
    }

    async listar(): Promise<UtenteResponseDto[]> {
        try {
            return await this.repo.find();
        } catch (error) {
            console.error('Erro ao listar utentes:', error);
            throw error;
        }
    }

    async atualizar(utenteId: number, utenteData: CreateUtenteDto, utilizadorIdLogado: number): Promise<UtenteResponseDto> {
        try {
            const anterior = await this.obter(utenteId);
            const atualizado = await this.repo.save({ ...anterior, ...utenteData, id: utenteId });

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utente',
                utenteId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            );

            return atualizado;
        } catch (error) {
            console.error('Erro ao atualizar utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<UtenteResponseDto[]> {
        try {
            return await this.repo.find({ where: { medico_id: medicoId } });
        } catch (error) {
            console.error('Erro ao listar utentes por médico:', error);
            throw error;
        }
    }

    async historicoClinico(utenteId: number): Promise<{
        utente_id: number;
        avaliacoes_carat: unknown[];
        alertas: unknown[];
        medicacoes: unknown[];
        exames: unknown[];
        sintomas: unknown[];
        anamnese: unknown;
    }> {
        try {
            if (utenteId <= 0) throw new Error('ID de utente inválido');
            return {
                utente_id: utenteId,
                avaliacoes_carat: [],
                alertas: [],
                medicacoes: [],
                exames: [],
                sintomas: [],
                anamnese: null
            };
        } catch (error) {
            console.error('Erro ao obter histórico clínico:', error);
            throw error;
        }
    }

    async apagar(utenteId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const anterior = await this.obter(utenteId);
            await this.repo.softDelete(utenteId);

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utente',
                utenteId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar utente:', error);
            throw error;
        }
    }
}
