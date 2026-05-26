import { AppDataSource } from '../database/data-source.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateAnamneseDto } from '../dtos/anamnese/create-anamnese.dto.js';
import type { AnamneseResponseDto } from '../dtos/anamnese/anamnese-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class AnamneseService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Anamnese); }
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }

    private async validarAcessoUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });
        if (!utente) {
            throw new Error('Utente nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== utilizador.id) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return utente;
        }

        throw new Error('Acesso negado: perfil sem permissao para anamnese');
    }

    private async obterInterna(anamneseId: number): Promise<Anamnese> {
        if (anamneseId <= 0) throw new Error('ID de anamnese invalido');
        const anamnese = await this.repo.findOne({ where: { id: anamneseId } });
        if (!anamnese) throw new Error('Anamnese nao encontrada');
        return anamnese;
    }

    async criar(anamneseData: CreateAnamneseDto, utilizador: UtilizadorAutenticado): Promise<AnamneseResponseDto> {
        try {
            if (anamneseData.utente_id <= 0) throw new Error('ID do utente deve ser valido');
            if (!anamneseData.sexo) throw new Error('Sexo da anamnese e obrigatorio');
            await this.validarAcessoUtente(anamneseData.utente_id, utilizador);

            const anamnese = this.repo.create(anamneseData);
            const saved = await this.repo.save(anamnese);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'anamnese',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as AnamneseResponseDto;
        } catch (error) {
            console.error('Erro ao criar anamnese:', error);
            throw error;
        }
    }

    async obter(anamneseId: number, utilizador: UtilizadorAutenticado): Promise<AnamneseResponseDto> {
        try {
            const anamnese = await this.obterInterna(anamneseId);
            await this.validarAcessoUtente(anamnese.utente_id, utilizador);
            return anamnese as AnamneseResponseDto;
        } catch (error) {
            console.error('Erro ao obter anamnese:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<AnamneseResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as AnamneseResponseDto[];
            }

            const utentes = await this.utenteRepo.find({ where: { medico_id: utilizador.id } });
            const utenteIds = utentes.map((u) => u.id);
            if (utenteIds.length === 0) return [];
            return await this.repo
                .createQueryBuilder('anamnese')
                .where('anamnese.utente_id IN (:...utenteIds)', { utenteIds })
                .getMany() as AnamneseResponseDto[];
        } catch (error) {
            console.error('Erro ao listar anamneses:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<AnamneseResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente invalido');
            await this.validarAcessoUtente(utenteId, utilizador);
            return await this.repo.find({ where: { utente_id: utenteId } }) as AnamneseResponseDto[];
        } catch (error) {
            console.error('Erro ao listar anamneses por utente:', error);
            throw error;
        }
    }

    async atualizar(
        anamneseId: number,
        anamneseData: CreateAnamneseDto,
        utilizador: UtilizadorAutenticado
    ): Promise<AnamneseResponseDto> {
        try {
            const anterior = await this.obterInterna(anamneseId);
            await this.validarAcessoUtente(anterior.utente_id, utilizador);
            await this.validarAcessoUtente(anamneseData.utente_id, utilizador);

            const atualizada = await this.repo.save({ ...anterior, ...anamneseData, id: anamneseId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'anamnese',
                anamneseId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as AnamneseResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar anamnese:', error);
            throw error;
        }
    }
}
