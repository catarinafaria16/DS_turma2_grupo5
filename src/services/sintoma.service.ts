import type { CreateSintomaDto } from '../dtos/sintoma/create-sintoma.dto';
import type { SintomaResponseDto } from '../dtos/sintoma/sintoma-response.dto';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class SintomaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        sintomaData: CreateSintomaDto,
        utilizadorIdLogado: number
    ): Promise<SintomaResponseDto> {
        try {
            if (sintomaData.utente_id <= 0) {
                throw new Error('ID do utente deve ser válido');
            }
            if (!sintomaData.descricao || sintomaData.descricao.trim().length === 0) {
                throw new Error('Descrição do sintoma é obrigatória');
            }

            const novoSintoma: SintomaResponseDto = {
                id: Math.random(),
                ...sintomaData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'sintoma',
                novoSintoma.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novoSintoma)
            );

            return novoSintoma;
        } catch (error) {
            console.error('Erro ao criar sintoma:', error);
            throw error;
        }
    }

    async obter(sintomaId: number): Promise<SintomaResponseDto> {
        try {
            if (sintomaId <= 0) {
                throw new Error('ID de sintoma inválido');
            }

            const sintoma: SintomaResponseDto = {
                id: sintomaId,
                utente_id: 0,
                descricao: '',
                intensidade: 'LEVE' as any,
                duracao: '',
                data_registo: new Date()
            };

            return sintoma;
        } catch (error) {
            console.error('Erro ao obter sintoma:', error);
            throw error;
        }
    }

    async listar(): Promise<SintomaResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar sintomas:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<SintomaResponseDto[]> {
        try {
            if (utenteId <= 0) {
                throw new Error('ID do utente inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar sintomas por utente:', error);
            throw error;
        }
    }

    async atualizar(
        sintomaId: number,
        sintomaData: CreateSintomaDto,
        utilizadorIdLogado: number
    ): Promise<SintomaResponseDto> {
        try {
            const sintomaAnterior = await this.obter(sintomaId);
            const sintomaAtualizado: SintomaResponseDto = {
                ...sintomaAnterior,
                ...sintomaData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'sintoma',
                sintomaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(sintomaAnterior),
                JSON.stringify(sintomaAtualizado)
            );

            return sintomaAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar sintoma:', error);
            throw error;
        }
    }

    async apagar(sintomaId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const sintomaAnterior = await this.obter(sintomaId);
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'sintoma',
                sintomaId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(sintomaAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar sintoma:', error);
            throw error;
        }
    }
}
