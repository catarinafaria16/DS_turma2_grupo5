import type { CreateUtenteDto } from '../dtos/utente/create-utente.dto';
import type { UtenteResponseDto } from '../dtos/utente/utente-response.dto';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class UtenteService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        utenteData: CreateUtenteDto,
        utilizadorIdLogado: number
    ): Promise<UtenteResponseDto> {
        try {
            if (utenteData.utilizador_id <= 0 || utenteData.medico_id <= 0) {
                throw new Error('IDs de utilizador e médico devem ser válidos');
            }
            if (!utenteData.morada || utenteData.morada.trim().length === 0) {
                throw new Error('Morada é obrigatória');
            }

            const novoUtente: UtenteResponseDto = {
                id: Math.random(),
                ...utenteData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utente',
                novoUtente.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novoUtente)
            );

            return novoUtente;
        } catch (error) {
            console.error('Erro ao criar utente:', error);
            throw error;
        }
    }

    async obter(utenteId: number): Promise<UtenteResponseDto> {
        try {
            if (utenteId <= 0) {
                throw new Error('ID de utente inválido');
            }

            const utente: UtenteResponseDto = {
                id: utenteId,
                utilizador_id: 0,
                medico_id: 0,
                nr_utente: 0,
                data_nascimento: new Date(),
                morada: '',
                contato: '',
                nr_faturacao: 0
            };

            return utente;
        } catch (error) {
            console.error('Erro ao obter utente:', error);
            throw error;
        }
    }

    async listar(): Promise<UtenteResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar utentes:', error);
            throw error;
        }
    }

    async atualizar(
        utenteId: number,
        utenteData: CreateUtenteDto,
        utilizadorIdLogado: number
    ): Promise<UtenteResponseDto> {
        try {
            const utenteAnterior = await this.obter(utenteId);
            const utenteAtualizado: UtenteResponseDto = {
                ...utenteAnterior,
                ...utenteData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utente',
                utenteId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(utenteAnterior),
                JSON.stringify(utenteAtualizado)
            );

            return utenteAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar utente:', error);
            throw error;
        }
    }

    async apagar(utenteId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const utenteAnterior = await this.obter(utenteId);
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utente',
                utenteId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(utenteAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar utente:', error);
            throw error;
        }
    }
}
