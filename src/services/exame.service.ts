import { AppDataSource } from '../database/data-source.js';
import { Exame } from '../models/exame.entity.js';
import { Prescricao } from '../models/prescricao.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateExameDto } from '../dtos/exame/create-exame.dto.js';
import type { ExameResponseDto } from '../dtos/exame/exame-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class ExameService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Exame); }
    private get prescricaoRepo() { return AppDataSource.getRepository(Prescricao); }
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }

    private async validarAcessoPrescricao(prescricaoId: number, utilizador: UtilizadorAutenticado): Promise<Prescricao> {
        if (prescricaoId <= 0) {
            throw new Error('ID de prescricao invalido');
        }

        const prescricao = await this.prescricaoRepo.findOne({ where: { id: prescricaoId } });
        if (!prescricao) {
            throw new Error('Prescricao nao encontrada');
        }

        const utente = await this.utenteRepo.findOne({ where: { id: prescricao.utente_id } });
        if (!utente) {
            throw new Error('Utente nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return prescricao;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (prescricao.medico_id !== utilizador.id || utente.medico_id !== utilizador.id) {
                throw new Error('Acesso negado: esta prescricao nao pertence ao medico autenticado');
            }
            return prescricao;
        }

        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar exames de outro utente');
            }
            return prescricao;
        }

        throw new Error('Acesso negado: perfil sem permissao para exames');
    }

    private async obterInterno(exameId: number): Promise<Exame> {
        if (exameId <= 0) {
            throw new Error('ID de exame invalido');
        }

        const exame = await this.repo.findOne({ where: { id: exameId } });
        if (!exame) {
            throw new Error('Exame nao encontrado');
        }

        return exame;
    }

    async criar(exameData: CreateExameDto, utilizador: UtilizadorAutenticado): Promise<ExameResponseDto> {
        try {
            await this.validarAcessoPrescricao(exameData.prescricao_id, utilizador);

            const exame = this.repo.create(exameData);
            const saved = await this.repo.save(exame);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'exame',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as ExameResponseDto;
        } catch (error) {
            console.error('Erro ao criar exame:', error);
            throw error;
        }
    }

    async obter(exameId: number, utilizador: UtilizadorAutenticado): Promise<ExameResponseDto> {
        try {
            const exame = await this.obterInterno(exameId);
            await this.validarAcessoPrescricao(exame.prescricao_id, utilizador);
            return exame as ExameResponseDto;
        } catch (error) {
            console.error('Erro ao obter exame:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<ExameResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as ExameResponseDto[];
            }

            let prescricoes: Prescricao[] = [];
            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                prescricoes = await this.prescricaoRepo.find({ where: { medico_id: utilizador.id } });
            } else {
                const utente = await this.utenteRepo.findOne({ where: { utilizador_id: utilizador.id } });
                if (!utente) {
                    return [];
                }
                prescricoes = await this.prescricaoRepo.find({ where: { utente_id: utente.id } });
            }

            const prescricaoIds = prescricoes.map((prescricao) => prescricao.id);
            if (prescricaoIds.length === 0) {
                return [];
            }

            return await this.repo
                .createQueryBuilder('exame')
                .where('exame.prescricao_id IN (:...prescricaoIds)', { prescricaoIds })
                .getMany() as ExameResponseDto[];
        } catch (error) {
            console.error('Erro ao listar exames:', error);
            throw error;
        }
    }

    async listarPorPrescricao(prescricaoId: number, utilizador: UtilizadorAutenticado): Promise<ExameResponseDto[]> {
        try {
            await this.validarAcessoPrescricao(prescricaoId, utilizador);
            return await this.repo.find({ where: { prescricao_id: prescricaoId } }) as ExameResponseDto[];
        } catch (error) {
            console.error('Erro ao listar exames por prescricao:', error);
            throw error;
        }
    }

    async atualizar(
        exameId: number,
        exameData: CreateExameDto,
        utilizador: UtilizadorAutenticado
    ): Promise<ExameResponseDto> {
        try {
            const anterior = await this.obterInterno(exameId);
            await this.validarAcessoPrescricao(anterior.prescricao_id, utilizador);
            await this.validarAcessoPrescricao(exameData.prescricao_id, utilizador);

            const atualizado = await this.repo.save({ ...anterior, ...exameData, id: exameId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'exame',
                exameId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as ExameResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar exame:', error);
            throw error;
        }
    }
}
