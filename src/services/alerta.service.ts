import { AppDataSource } from '../database/data-source.js';
import { Alerta } from '../models/alerta.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateAlertaDto } from '../dtos/alerta/create-alerta.dto.js';
import type { AlertaResponseDto } from '../dtos/alerta/alerta-response.dto.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class AlertaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Alerta); }
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }

    private async validarAcessoUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });
        if (!utente) throw new Error('Utente nao encontrado');

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) return utente;
        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== utilizador.id) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return utente;
        }
        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar alertas de outro utente');
            }
            return utente;
        }

        throw new Error('Perfil nao reconhecido');
    }

    private async obterInterno(alertaId: number): Promise<Alerta> {
        if (alertaId <= 0) throw new Error('ID de alerta invalido');
        const alerta = await this.repo.findOne({ where: { id: alertaId } });
        if (!alerta) throw new Error('Alerta nao encontrado');
        return alerta;
    }

    async criar(alertaData: CreateAlertaDto, utilizador: UtilizadorAutenticado): Promise<AlertaResponseDto> {
        try {
            if (alertaData.utente_id <= 0 || alertaData.medico_id <= 0 || alertaData.regra_id <= 0) {
                throw new Error('IDs de utente, medico e regra devem ser validos');
            }

            const utente = await this.validarAcessoUtente(alertaData.utente_id, utilizador);
            if (
                utilizador.perfil === PerfilUtilizador.MEDICO &&
                (alertaData.medico_id !== utilizador.id || utente.medico_id !== utilizador.id)
            ) {
                throw new Error('Acesso negado: medico so pode criar alertas dos seus utentes');
            }

            const alerta = this.repo.create({
                ...alertaData,
                data_atualizacao_estado: new Date()
            });
            const saved = await this.repo.save(alerta);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'alerta',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao criar alerta:', error);
            throw error;
        }
    }

    async obter(alertaId: number, utilizador: UtilizadorAutenticado): Promise<AlertaResponseDto> {
        try {
            const alerta = await this.obterInterno(alertaId);
            await this.validarAcessoUtente(alerta.utente_id, utilizador);
            return alerta as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao obter alerta:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<AlertaResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as AlertaResponseDto[];
            }
            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                return await this.repo.find({ where: { medico_id: utilizador.id } }) as AlertaResponseDto[];
            }

            const utente = await this.utenteRepo.findOne({ where: { utilizador_id: utilizador.id } });
            if (!utente) return [];
            return await this.repo.find({ where: { utente_id: utente.id } }) as AlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alertas:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<AlertaResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente invalido');
            await this.validarAcessoUtente(utenteId, utilizador);
            return await this.repo.find({ where: { utente_id: utenteId } }) as AlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alertas por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number, utilizador: UtilizadorAutenticado): Promise<AlertaResponseDto[]> {
        try {
            if (medicoId <= 0) throw new Error('ID do medico invalido');
            if (utilizador.perfil === PerfilUtilizador.MEDICO && medicoId !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar alertas de outro medico');
            }
            if (utilizador.perfil === PerfilUtilizador.UTENTE) {
                throw new Error('Acesso negado: utente nao pode consultar alertas por medico');
            }
            return await this.repo.find({ where: { medico_id: medicoId } }) as AlertaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alertas por medico:', error);
            throw error;
        }
    }

    async atualizarEstado(alertaId: number, novoEstado: EstadoAlerta, utilizador: UtilizadorAutenticado): Promise<AlertaResponseDto> {
        try {
            const anterior = await this.obterInterno(alertaId);
            await this.validarAcessoUtente(anterior.utente_id, utilizador);

            const atualizado = await this.repo.save({
                ...anterior,
                id: alertaId,
                estado: novoEstado,
                data_atualizacao_estado: new Date()
            });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'alerta',
                alertaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar estado do alerta:', error);
            throw error;
        }
    }

    async adicionarNota(alertaId: number, nota: string, utilizador: UtilizadorAutenticado): Promise<AlertaResponseDto> {
        try {
            if (!nota || nota.trim().length === 0) throw new Error('Nota nao pode ser vazia');

            const anterior = await this.obterInterno(alertaId);
            await this.validarAcessoUtente(anterior.utente_id, utilizador);

            const timestamp = new Date().toISOString();
            const novaNotaTexto = anterior.notas !== undefined
                ? `${anterior.notas}\n[${timestamp}] ${nota}`
                : `[${timestamp}] ${nota}`;

            const atualizado = await this.repo.save({
                ...anterior,
                id: alertaId,
                notas: novaNotaTexto,
                data_atualizacao_estado: new Date()
            });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'alerta',
                alertaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as AlertaResponseDto;
        } catch (error) {
            console.error('Erro ao adicionar nota ao alerta:', error);
            throw error;
        }
    }

    async obterResumo(utilizador: UtilizadorAutenticado): Promise<{ total: number; por_estado: Record<string, number>; por_tipo: Record<string, number>; por_prioridade: Record<string, number>; }> {
        try {
            const alertas = await this.listar(utilizador);
            const por_estado: Record<string, number> = {};
            const por_tipo: Record<string, number> = {};
            const por_prioridade: Record<string, number> = {};

            for (const alerta of alertas) {
                por_estado[alerta.estado] = (por_estado[alerta.estado] ?? 0) + 1;
                por_tipo[alerta.tipo] = (por_tipo[alerta.tipo] ?? 0) + 1;
                por_prioridade[alerta.prioridade] = (por_prioridade[alerta.prioridade] ?? 0) + 1;
            }

            return { total: alertas.length, por_estado, por_tipo, por_prioridade };
        } catch (error) {
            console.error('Erro ao obter resumo de alertas:', error);
            throw error;
        }
    }
}
