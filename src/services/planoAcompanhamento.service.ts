/*
 * ============================================================
 * planoAcompanhamento.service.ts — Serviço de planos de acompanhamento
 * ============================================================
 *
 * Este service gere os planos de acompanhamento clínico definidos pelo médico.
 * Um plano estabelece a frequência das consultas, a duração do acompanhamento
 * e as recomendações clínicas para o utente.
 *
 * Funcionalidades:
 *   - Criar/atualizar planos de acompanhamento
 *   - Alterar o estado de um plano (ATIVO → CONCLUIDO ou SUSPENSO)
 *   - Listar planos por utente ou por médico
 *
 * Regras de acesso:
 *   - ADMINISTRADOR: acesso a todos os planos
 *   - MÉDICO: só gere planos dos seus utentes
 *   - UTENTE: só consulta os seus próprios planos
 */
import { AppDataSource } from '../database/data-source.js';
import { PlanoAcompanhamento } from '../models/planoAcompanhamento.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreatePlanoAcompanhamentoDto } from '../dtos/planoAcompanhamento/create-planoAcompanhamento.dto.js';
import type { PlanoAcompanhamentoResponseDto } from '../dtos/planoAcompanhamento/planoAcompanhamento-response.dto.js';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { validarEnum } from '../utils/validateEnum.js';
import { obterMedicoIdAutenticado } from './perfilAcesso.helper.js';

export class PlanoAcompanhamentoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(PlanoAcompanhamento); }
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }

    private async validarAcessoUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        if (utenteId <= 0) {
            throw new Error('ID do utente invalido');
        }

        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });
        if (!utente) {
            throw new Error('Utente nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar planos de outro utente');
            }
            return utente;
        }

        throw new Error('Acesso negado: perfil sem permissao para planos de acompanhamento');
    }

    private async obterInterno(planoId: number): Promise<PlanoAcompanhamento> {
        if (planoId <= 0) {
            throw new Error('ID de plano invalido');
        }

        const plano = await this.repo.findOne({ where: { id: planoId } });
        if (!plano) {
            throw new Error('Plano de acompanhamento nao encontrado');
        }

        return plano;
    }

    async criar(planoData: CreatePlanoAcompanhamentoDto, utilizador: UtilizadorAutenticado): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            if (planoData.medico_id <= 0 || planoData.utente_id <= 0) {
                throw new Error('IDs de medico e utente devem ser validos');
            }
            if (planoData.estado !== undefined) {
                validarEnum(EstadoPlanoAcompanhamento, planoData.estado, 'estado');
            }
            if (planoData.data_inicio >= planoData.data_fim) {
                throw new Error('Data de inicio deve ser anterior a data de fim');
            }

            const utente = await this.validarAcessoUtente(planoData.utente_id, utilizador);
            if (
                utilizador.perfil === PerfilUtilizador.MEDICO &&
                (planoData.medico_id !== await obterMedicoIdAutenticado(utilizador) || utente.medico_id !== await obterMedicoIdAutenticado(utilizador))
            ) {
                throw new Error('Acesso negado: medico so pode criar planos para os seus utentes');
            }

            const plano = this.repo.create({
                ...planoData,
                estado: planoData.estado ?? EstadoPlanoAcompanhamento.ATIVO
            });
            const saved = await this.repo.save(plano);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'plano_acompanhamento',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao criar plano de acompanhamento:', error);
            throw error;
        }
    }

    async obter(planoId: number, utilizador: UtilizadorAutenticado): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            const plano = await this.obterInterno(planoId);
            await this.validarAcessoUtente(plano.utente_id, utilizador);
            return plano as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao obter plano de acompanhamento:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as PlanoAcompanhamentoResponseDto[];
            }

            if (utilizador.perfil === PerfilUtilizador.UTENTE) {
                const utente = await this.utenteRepo.findOne({ where: { utilizador_id: utilizador.id } });
                if (!utente) return [];
                return await this.repo.find({ where: { utente_id: utente.id } }) as PlanoAcompanhamentoResponseDto[];
            }

            return await this.repo.find({ where: { medico_id: await obterMedicoIdAutenticado(utilizador) } }) as PlanoAcompanhamentoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar planos de acompanhamento:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            await this.validarAcessoUtente(utenteId, utilizador);
            return await this.repo.find({ where: { utente_id: utenteId } }) as PlanoAcompanhamentoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar planos por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number, utilizador: UtilizadorAutenticado): Promise<PlanoAcompanhamentoResponseDto[]> {
        try {
            if (medicoId <= 0) {
                throw new Error('ID do medico invalido');
            }
            if (utilizador.perfil === PerfilUtilizador.MEDICO && medicoId !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: nao pode consultar planos de outro medico');
            }

            return await this.repo.find({ where: { medico_id: medicoId } }) as PlanoAcompanhamentoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar planos por medico:', error);
            throw error;
        }
    }

    async atualizar(
        planoId: number,
        planoData: CreatePlanoAcompanhamentoDto,
        utilizador: UtilizadorAutenticado
    ): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            if (planoData.data_inicio >= planoData.data_fim) {
                throw new Error('Data de inicio deve ser anterior a data de fim');
            }
            if (planoData.estado !== undefined) {
                validarEnum(EstadoPlanoAcompanhamento, planoData.estado, 'estado');
            }
            const anterior = await this.obterInterno(planoId);
            const utenteAnterior = await this.validarAcessoUtente(anterior.utente_id, utilizador);
            const utenteNovo = await this.validarAcessoUtente(planoData.utente_id, utilizador);

            if (
                utilizador.perfil === PerfilUtilizador.MEDICO &&
                (
                    anterior.medico_id !== await obterMedicoIdAutenticado(utilizador) ||
                    planoData.medico_id !== await obterMedicoIdAutenticado(utilizador) ||
                    utenteAnterior.medico_id !== await obterMedicoIdAutenticado(utilizador) ||
                    utenteNovo.medico_id !== await obterMedicoIdAutenticado(utilizador)
                )
            ) {
                throw new Error('Acesso negado: nao pode alterar planos de outro medico');
            }

            if (planoData.estado !== undefined) {
                validarEnum(EstadoPlanoAcompanhamento, planoData.estado, 'estado');
            }

            const atualizado = await this.repo.save({ ...anterior, ...planoData, id: planoId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'plano_acompanhamento',
                planoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar plano de acompanhamento:', error);
            throw error;
        }
    }

    async atualizarEstado(
        planoId: number,
        novoEstado: EstadoPlanoAcompanhamento,
        utilizador: UtilizadorAutenticado
    ): Promise<PlanoAcompanhamentoResponseDto> {
        try {
            validarEnum(EstadoPlanoAcompanhamento, novoEstado, 'estado');
            const anterior = await this.obterInterno(planoId);
            await this.validarAcessoUtente(anterior.utente_id, utilizador);

            if (utilizador.perfil === PerfilUtilizador.MEDICO && anterior.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: nao pode alterar planos de outro medico');
            }

            const atualizado = await this.repo.save({ ...anterior, id: planoId, estado: novoEstado });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'plano_acompanhamento',
                planoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as PlanoAcompanhamentoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar estado do plano:', error);
            throw error;
        }
    }
}
