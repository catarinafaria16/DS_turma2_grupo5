import { AppDataSource } from '../database/data-source.js';
import { RegraAlerta } from '../models/regraAlerta.entity.js';
import type { CreateRegraAlertaDto } from '../dtos/regraAlerta/create-regraAlerta.dto.js';
import type { RegraAlertaResponseDto } from '../dtos/regraAlerta/regraAlerta-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class RegraAlertaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(RegraAlerta); }

    private validarAcessoMedico(medicoId: number, utilizador: UtilizadorAutenticado): void {
        if (medicoId <= 0) {
            throw new Error('ID do medico invalido');
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO && medicoId !== utilizador.id) {
            throw new Error('Acesso negado: nao pode gerir regras de outro medico');
        }
    }

    private async obterInterna(regraId: number): Promise<RegraAlerta> {
        if (regraId <= 0) {
            throw new Error('ID de regra invalido');
        }

        const regra = await this.repo.findOne({ where: { id: regraId } });
        if (!regra) {
            throw new Error('Regra de alerta nao encontrada');
        }

        return regra;
    }

    async criar(regraData: CreateRegraAlertaDto, utilizador: UtilizadorAutenticado): Promise<RegraAlertaResponseDto> {
        try {
            if (regraData.medico_id <= 0 || regraData.administrador_id <= 0) {
                throw new Error('IDs de medico e administrador devem ser validos');
            }

            this.validarAcessoMedico(regraData.medico_id, utilizador);

            const regra = this.repo.create(regraData);
            const saved = await this.repo.save(regra);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'regra_alerta',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as RegraAlertaResponseDto;
        } catch (error) {
            console.error('Erro ao criar regra de alerta:', error);
            throw error;
        }
    }

    async obter(regraId: number, utilizador: UtilizadorAutenticado): Promise<RegraAlertaResponseDto> {
        try {
            const regra = await this.obterInterna(regraId);
            this.validarAcessoMedico(regra.medico_id, utilizador);
            return regra as RegraAlertaResponseDto;
        } catch (error) {
            console.error('Erro ao obter regra de alerta:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<RegraAlertaResponseDto[]> {
        try {
            // Administrador ve e gere todos os limiares do sistema.
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as RegraAlertaResponseDto[];
            }

            // Medico ve e ajusta apenas os valores das regras ligadas aos seus proprios utentes.
            return await this.repo.find({ where: { medico_id: utilizador.id } }) as RegraAlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar regras de alerta:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number, utilizador: UtilizadorAutenticado): Promise<RegraAlertaResponseDto[]> {
        try {
            this.validarAcessoMedico(medicoId, utilizador);
            return await this.repo.find({ where: { medico_id: medicoId } }) as RegraAlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar regras por medico:', error);
            throw error;
        }
    }

    async atualizar(
        regraId: number,
        regraData: CreateRegraAlertaDto,
        utilizador: UtilizadorAutenticado
    ): Promise<RegraAlertaResponseDto> {
        try {
            const anterior = await this.obterInterna(regraId);
            this.validarAcessoMedico(anterior.medico_id, utilizador);
            this.validarAcessoMedico(regraData.medico_id, utilizador);

            const atualizada = await this.repo.save({ ...anterior, ...regraData, id: regraId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'regra_alerta',
                regraId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as RegraAlertaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar regra de alerta:', error);
            throw error;
        }
    }

    async apagar(regraId: number, utilizador: UtilizadorAutenticado): Promise<void> {
        try {
            const anterior = await this.obterInterna(regraId);
            this.validarAcessoMedico(anterior.medico_id, utilizador);
            await this.repo.softDelete(regraId);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'regra_alerta',
                regraId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));
        } catch (error) {
            console.error('Erro ao apagar regra de alerta:', error);
            throw error;
        }
    }
}
