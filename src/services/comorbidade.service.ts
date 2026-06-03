import { AppDataSource } from '../database/data-source.js';
import { Comorbidade } from '../models/comorbidade.entity.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateComorbidadeDto } from '../dtos/comorbidade/create-comorbidade.dto.js';
import type { ComorbidadeResponseDto } from '../dtos/comorbidade/comorbidade-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { obterMedicoIdAutenticado } from './perfilAcesso.helper.js';

export class ComorbidadeService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Comorbidade); }
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
            if (utente.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return anamnese;
        }

        throw new Error('Acesso negado: perfil sem permissao para comorbidades');
    }

    private async obterInterna(comorbidadeId: number): Promise<Comorbidade> {
        if (comorbidadeId <= 0) {
            throw new Error('ID de comorbidade invalido');
        }

        const comorbidade = await this.repo.findOne({ where: { id: comorbidadeId } });
        if (!comorbidade) {
            throw new Error('Comorbidade nao encontrada');
        }

        return comorbidade;
    }

    async criar(comorbidadeData: CreateComorbidadeDto, utilizador: UtilizadorAutenticado): Promise<ComorbidadeResponseDto> {
        try {
            if (!comorbidadeData.descricao || comorbidadeData.descricao.trim().length === 0) {
                throw new Error('Descricao da comorbidade e obrigatoria');
            }

            await this.validarAcessoAnamnese(comorbidadeData.anamnese_id, utilizador);

            const comorbidade = this.repo.create(comorbidadeData);
            const saved = await this.repo.save(comorbidade);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'comorbidade',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as ComorbidadeResponseDto;
        } catch (error) {
            console.error('Erro ao criar comorbidade:', error);
            throw error;
        }
    }

    async obter(comorbidadeId: number, utilizador: UtilizadorAutenticado): Promise<ComorbidadeResponseDto> {
        try {
            const comorbidade = await this.obterInterna(comorbidadeId);
            await this.validarAcessoAnamnese(comorbidade.anamnese_id, utilizador);
            return comorbidade as ComorbidadeResponseDto;
        } catch (error) {
            console.error('Erro ao obter comorbidade:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<ComorbidadeResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as ComorbidadeResponseDto[];
            }

            const utentes = await this.utenteRepo.find({ where: { medico_id: await obterMedicoIdAutenticado(utilizador) } });
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
                .createQueryBuilder('comorbidade')
                .where('comorbidade.anamnese_id IN (:...anamneseIds)', { anamneseIds })
                .getMany() as ComorbidadeResponseDto[];
        } catch (error) {
            console.error('Erro ao listar comorbidades:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number, utilizador: UtilizadorAutenticado): Promise<ComorbidadeResponseDto[]> {
        try {
            await this.validarAcessoAnamnese(anamneseId, utilizador);
            return await this.repo.find({ where: { anamnese_id: anamneseId } }) as ComorbidadeResponseDto[];
        } catch (error) {
            console.error('Erro ao listar comorbidades por anamnese:', error);
            throw error;
        }
    }

    async atualizar(
        comorbidadeId: number,
        comorbidadeData: CreateComorbidadeDto,
        utilizador: UtilizadorAutenticado
    ): Promise<ComorbidadeResponseDto> {
        try {
            const anterior = await this.obterInterna(comorbidadeId);
            await this.validarAcessoAnamnese(anterior.anamnese_id, utilizador);
            await this.validarAcessoAnamnese(comorbidadeData.anamnese_id, utilizador);

            const atualizada = await this.repo.save({ ...anterior, ...comorbidadeData, id: comorbidadeId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'comorbidade',
                comorbidadeId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as ComorbidadeResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar comorbidade:', error);
            throw error;
        }
    }
}
