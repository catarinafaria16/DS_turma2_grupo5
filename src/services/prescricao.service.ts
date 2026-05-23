import { AppDataSource } from '../database/data-source.js';
import { Prescricao } from '../models/prescricao.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreatePrescricaoDto } from '../dtos/prescricao/create-prescricao.dto.js';
import type { PrescricaoResponseDto } from '../dtos/prescricao/prescricao-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class PrescricaoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Prescricao); }
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

        throw new Error('Acesso negado: perfil sem permissao para prescricoes');
    }

    private async obterInterna(prescricaoId: number): Promise<Prescricao> {
        if (prescricaoId <= 0) throw new Error('ID de prescricao invalido');
        const prescricao = await this.repo.findOne({ where: { id: prescricaoId } });
        if (!prescricao) throw new Error('Prescricao nao encontrada');
        return prescricao;
    }

    async criar(prescricaoData: CreatePrescricaoDto, utilizador: UtilizadorAutenticado): Promise<PrescricaoResponseDto> {
        try {
            if (prescricaoData.medico_id <= 0 || prescricaoData.utente_id <= 0) {
                throw new Error('IDs de medico e utente devem ser validos');
            }

            const utente = await this.validarAcessoUtente(prescricaoData.utente_id, utilizador);
            if (
                utilizador.perfil === PerfilUtilizador.MEDICO &&
                (prescricaoData.medico_id !== utilizador.id || utente.medico_id !== utilizador.id)
            ) {
                throw new Error('Acesso negado: medico so pode criar prescricoes para os seus utentes');
            }

            const prescricao = this.repo.create(prescricaoData);
            const saved = await this.repo.save(prescricao);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'prescricao',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as PrescricaoResponseDto;
        } catch (error) {
            console.error('Erro ao criar prescricao:', error);
            throw error;
        }
    }

    async obter(prescricaoId: number, utilizador: UtilizadorAutenticado): Promise<PrescricaoResponseDto> {
        try {
            const prescricao = await this.obterInterna(prescricaoId);
            await this.validarAcessoUtente(prescricao.utente_id, utilizador);
            return prescricao as PrescricaoResponseDto;
        } catch (error) {
            console.error('Erro ao obter prescricao:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<PrescricaoResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as PrescricaoResponseDto[];
            }
            return await this.repo.find({ where: { medico_id: utilizador.id } }) as PrescricaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar prescricoes:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<PrescricaoResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente invalido');
            await this.validarAcessoUtente(utenteId, utilizador);
            return await this.repo.find({ where: { utente_id: utenteId } }) as PrescricaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar prescricoes por utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number, utilizador: UtilizadorAutenticado): Promise<PrescricaoResponseDto[]> {
        try {
            if (medicoId <= 0) throw new Error('ID do medico invalido');
            if (utilizador.perfil === PerfilUtilizador.MEDICO && medicoId !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar prescricoes de outro medico');
            }
            return await this.repo.find({ where: { medico_id: medicoId } }) as PrescricaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar prescricoes por medico:', error);
            throw error;
        }
    }

    async atualizar(
        prescricaoId: number,
        prescricaoData: CreatePrescricaoDto,
        utilizador: UtilizadorAutenticado
    ): Promise<PrescricaoResponseDto> {
        try {
            const anterior = await this.obterInterna(prescricaoId);
            const utente = await this.validarAcessoUtente(anterior.utente_id, utilizador);

            if (
                utilizador.perfil === PerfilUtilizador.MEDICO &&
                (prescricaoData.medico_id !== utilizador.id || utente.medico_id !== utilizador.id)
            ) {
                throw new Error('Acesso negado: nao pode alterar prescricoes de outro medico');
            }

            await this.validarAcessoUtente(prescricaoData.utente_id, utilizador);

            const atualizada = await this.repo.save({ ...anterior, ...prescricaoData, id: prescricaoId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'prescricao',
                prescricaoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as PrescricaoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar prescricao:', error);
            throw error;
        }
    }
}
