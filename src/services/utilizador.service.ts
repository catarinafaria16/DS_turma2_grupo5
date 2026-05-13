import type { CreateUtilizadorDto } from '../dtos/utilizador/create-utilizador.dto';
import type { UtilizadorResponseDto } from '../dtos/utilizador/utilizador-response.dto';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum';

export class UtilizadorService {
    private auditoriaService: any; // TODO: Implementar AuditoriaService

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        utilizadorData: CreateUtilizadorDto,
        utilizadorIdLogado: number
    ): Promise<UtilizadorResponseDto> {
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

            const novoUtilizador: UtilizadorResponseDto = {
                id: Math.random(),
                ...utilizadorData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                novoUtilizador.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novoUtilizador)
            );

            return novoUtilizador;
        } catch (error) {
            console.error('Erro ao criar utilizador:', error);
            throw error;
        }
    }

    async obter(utilizadorId: number): Promise<UtilizadorResponseDto> {
        try {
            if (utilizadorId <= 0) {
                throw new Error('ID de utilizador inválido');
            }

            const utilizador: UtilizadorResponseDto = {
                id: utilizadorId,
                nome: '',
                email: '',
                password: '',
                perfil: 'UTENTE' as any
            };

            return utilizador;
        } catch (error) {
            console.error('Erro ao obter utilizador:', error);
            throw error;
        }
    }

    async listar(): Promise<UtilizadorResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar utilizadores:', error);
            throw error;
        }
    }

    async atualizar(
        utilizadorId: number,
        utilizadorData: CreateUtilizadorDto,
        utilizadorIdLogado: number
    ): Promise<UtilizadorResponseDto> {
        try {
            const utilizadorAnterior = await this.obter(utilizadorId);
            const utilizadorAtualizado: UtilizadorResponseDto = {
                ...utilizadorAnterior,
                ...utilizadorData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                utilizadorId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(utilizadorAnterior),
                JSON.stringify(utilizadorAtualizado)
            );

            return utilizadorAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar utilizador:', error);
            throw error;
        }
    }

    async apagar(utilizadorId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const utilizadorAnterior = await this.obter(utilizadorId);
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                utilizadorId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(utilizadorAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar utilizador:', error);
            throw error;
        }
    }
}
