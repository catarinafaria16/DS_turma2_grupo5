import type { CreatePlanoAcompanhamentoDto } from '../dtos/planoAcompanhamento/create-planoAcompanhamento.dto.js';
import type { PlanoAcompanhamentoResponseDto } from '../dtos/planoAcompanhamento/planoAcompanhamento-response.dto.js';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class PlanoAcompanhamentoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        planoData: CreatePlanoAcompanhamentoDto,
        utilizadorIdLogado: number
    ): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            if (planoData.medico_id <= 0 || planoData.utente_id <= 0) {
                throw new Error('IDs de médico e utente devem ser válidos');
            }
            if (planoData.data_inicio >= planoData.data_fim) {
                throw new Error('Data de início deve ser anterior à data de fim');
            }

            const novoPlano: PlanoAcompanhamentoResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...planoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'plano_acompanhamento',
                novoPlano.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novoPlano)
            );

            return novoPlano;
        } catch (error) {
            console.error('Erro ao criar plano de acompanhamento:', error);
            throw error;
        }
    }

    async obter(planoId: number): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            if (planoId <= 0) {
                throw new Error('ID de plano inválido');
            }

            const plano: PlanoAcompanhamentoResponseDto = {
                id: planoId,
                medico_id: 0,
                utente_id: 0,
                frequencia_avaliacao: '',
                data_inicio: new Date(),
                data_fim: new Date(),
                estado: EstadoPlanoAcompanhamento.ATIVO,
                recomendacao_medica: ''
            };

            return plano;
        } catch (error) {
            console.error('Erro ao obter plano de acompanhamento:', error);
            throw error;
        }
    }

    async listar(): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            // TODO: Buscar todos os planos na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar planos de acompanhamento:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            if (utenteId <= 0) {
                throw new Error('ID do utente inválido');
            }

            // TODO: Filtrar planos por utente na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar planos por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            if (medicoId <= 0) {
                throw new Error('ID do médico inválido');
            }

            // TODO: Filtrar planos por médico na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar planos por médico:', error);
            throw error;
        }
    }

    async atualizar(
        planoId: number,
        planoData: CreatePlanoAcompanhamentoDto,
        utilizadorIdLogado: number
    ): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            const planoAnterior = await this.obter(planoId);

            const planoAtualizado: PlanoAcompanhamentoResponseDto = {
                ...planoAnterior,
                ...planoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'plano_acompanhamento',
                planoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(planoAnterior),
                JSON.stringify(planoAtualizado)
            );

            return planoAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar plano de acompanhamento:', error);
            throw error;
        }
    }

    async atualizarEstado(
        planoId: number,
        novoEstado: EstadoPlanoAcompanhamento,
        utilizadorIdLogado: number
    ): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            const planoAnterior = await this.obter(planoId);

            const planoAtualizado: PlanoAcompanhamentoResponseDto = {
                ...planoAnterior,
                estado: novoEstado
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'plano_acompanhamento',
                planoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(planoAnterior),
                JSON.stringify(planoAtualizado)
            );

            return planoAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar estado do plano:', error);
            throw error;
        }
    }

    async apagar(planoId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const planoAnterior = await this.obter(planoId);
            const planoEliminado = { ...planoAnterior, deleted_at: new Date() };
            // TODO: UPDATE plano_acompanhamento SET deleted_at = NOW() WHERE id = planoId
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'plano_acompanhamento',
                planoId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(planoAnterior),
                JSON.stringify(planoEliminado)
            );
        } catch (error) {
            console.error('Erro ao apagar plano de acompanhamento:', error);
            throw error;
        }
    }
}
