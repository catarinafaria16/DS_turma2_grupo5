import type { CreateAnamneseDto } from '../dtos/anamnese/create-anamnese.dto.js';
import type { AnamneseResponseDto } from '../dtos/anamnese/anamnese-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class AnamneseService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        anamneseData: CreateAnamneseDto,
        utilizadorIdLogado: number
    ): Promise<AnamneseResponseDto> {
        try {
            if (anamneseData.utente_id <= 0) {
                throw new Error('ID do utente deve ser válido');
            }

            const novaAnamnese: AnamneseResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...anamneseData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'anamnese',
                novaAnamnese.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaAnamnese)
            );

            return novaAnamnese;
        } catch (error) {
            console.error('Erro ao criar anamnese:', error);
            throw error;
        }
    }

    async obter(anamneseId: number): Promise<AnamneseResponseDto> {
        try {
            if (anamneseId <= 0) {
                throw new Error('ID de anamnese inválido');
            }

            const anamnese: AnamneseResponseDto = {
                id: anamneseId,
                utente_id: 0,
                historico_familiar: '',
                tabagismo: 'NAO_FUMADOR' as any // TODO: Substituir pelo valor real da BD
            };

            return anamnese;
        } catch (error) {
            console.error('Erro ao obter anamnese:', error);
            throw error;
        }
    }

    async listar(): Promise<AnamneseResponseDto[]> {
        try {
            // TODO: Buscar todas as anamneses na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar anamneses:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<AnamneseResponseDto[]> {
        try {
            if (utenteId <= 0) {
                throw new Error('ID do utente inválido');
            }

            // TODO: Buscar anamneses por utente na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar anamneses por utente:', error);
            throw error;
        }
    }

    async atualizar(
        anamneseId: number,
        anamneseData: CreateAnamneseDto,
        utilizadorIdLogado: number
    ): Promise<AnamneseResponseDto> {
        try {
            const anamneseAnterior = await this.obter(anamneseId);

            const anamneseAtualizada: AnamneseResponseDto = {
                ...anamneseAnterior,
                ...anamneseData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'anamnese',
                anamneseId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anamneseAnterior),
                JSON.stringify(anamneseAtualizada)
            );

            return anamneseAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar anamnese:', error);
            throw error;
        }
    }

    async apagar(anamneseId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const anamneseAnterior = await this.obter(anamneseId);

            // TODO: Apagar da base de dados ou usar soft delete
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'anamnese',
                anamneseId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anamneseAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar anamnese:', error);
            throw error;
        }
    }
}
