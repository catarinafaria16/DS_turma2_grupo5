import { AppDataSource } from '../database/data-source.js';
import { Alergia } from '../models/alergia.entity.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateAlergiaDto } from '../dtos/alergia/create-alergia.dto.js';
import type { AlergiaResponseDto } from '../dtos/alergia/alergia-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class AlergiaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Alergia); }
    private get anamneseRepo() { return AppDataSource.getRepository(Anamnese); }
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }

    private async validarAcessoAnamnese(anamneseId: number, utilizador: UtilizadorAutenticado): Promise<Anamnese> {
        if (anamneseId <= 0) {
            throw new Error('ID de anamnese invalido');
        }

        const anamnese = await this.anamneseRepo.findOne({ where: { id: anamneseId } });
        if (!anamnese) {
            throw new Error('Anamnese nao encontrada');
        }

        const utente = await this.utenteRepo.findOne({ where: { id: anamnese.utente_id } });
        if (!utente) {
            throw new Error('Utente nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return anamnese;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== utilizador.id) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return anamnese;
        }

        throw new Error('Acesso negado: perfil sem permissao para alergias');
    }

    private async obterInterna(alergiaId: number): Promise<Alergia> {
        if (alergiaId <= 0) {
            throw new Error('ID de alergia invalido');
        }

        const alergia = await this.repo.findOne({ where: { id: alergiaId } });
        if (!alergia) {
            throw new Error('Alergia nao encontrada');
        }

        return alergia;
    }

    async criar(alergiaData: CreateAlergiaDto, utilizador: UtilizadorAutenticado): Promise<AlergiaResponseDto> {
        try {
            if (!alergiaData.descricao || alergiaData.descricao.trim().length === 0) {
                throw new Error('Descricao da alergia e obrigatoria');
            }
            if (!alergiaData.intensidade_crise) {
                throw new Error('Intensidade das crises e obrigatoria');
            }
            if (!alergiaData.frequencia_crise || alergiaData.frequencia_crise.trim().length === 0) {
                throw new Error('Frequencia das crises e obrigatoria');
            }

            await this.validarAcessoAnamnese(alergiaData.anamnese_id, utilizador);

            const alergia = this.repo.create(alergiaData);
            const saved = await this.repo.save(alergia);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'alergia',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as AlergiaResponseDto;
        } catch (error) {
            console.error('Erro ao criar alergia:', error);
            throw error;
        }
    }

    async obter(alergiaId: number, utilizador: UtilizadorAutenticado): Promise<AlergiaResponseDto> {
        try {
            const alergia = await this.obterInterna(alergiaId);
            await this.validarAcessoAnamnese(alergia.anamnese_id, utilizador);
            return alergia as AlergiaResponseDto;
        } catch (error) {
            console.error('Erro ao obter alergia:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<AlergiaResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as AlergiaResponseDto[];
            }

            const utentes = await this.utenteRepo.find({ where: { medico_id: utilizador.id } });
            const utenteIds = utentes.map((utente) => utente.id);
            if (utenteIds.length === 0) {
                return [];
            }

            const anamneses = await this.anamneseRepo
                .createQueryBuilder('anamnese')
                .where('anamnese.utente_id IN (:...utenteIds)', { utenteIds })
                .getMany();

            const anamneseIds = anamneses.map((anamnese) => anamnese.id);
            if (anamneseIds.length === 0) {
                return [];
            }

            return await this.repo
                .createQueryBuilder('alergia')
                .where('alergia.anamnese_id IN (:...anamneseIds)', { anamneseIds })
                .getMany() as AlergiaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alergias:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number, utilizador: UtilizadorAutenticado): Promise<AlergiaResponseDto[]> {
        try {
            await this.validarAcessoAnamnese(anamneseId, utilizador);
            return await this.repo.find({ where: { anamnese_id: anamneseId } }) as AlergiaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar alergias por anamnese:', error);
            throw error;
        }
    }

    async atualizar(
        alergiaId: number,
        alergiaData: CreateAlergiaDto,
        utilizador: UtilizadorAutenticado
    ): Promise<AlergiaResponseDto> {
        try {
            const anterior = await this.obterInterna(alergiaId);
            await this.validarAcessoAnamnese(anterior.anamnese_id, utilizador);
            await this.validarAcessoAnamnese(alergiaData.anamnese_id, utilizador);

            const atualizada = await this.repo.save({ ...anterior, ...alergiaData, id: alergiaId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'alergia',
                alergiaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as AlergiaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar alergia:', error);
            throw error;
        }
    }
}
