import { AppDataSource } from '../database/data-source.js';
import { Sintoma } from '../models/sintoma.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateSintomaDto } from '../dtos/sintoma/create-sintoma.dto.js';
import type { SintomaResponseDto } from '../dtos/sintoma/sintoma-response.dto.js';
import { IntensidadeSintoma } from '../enums/IntensidadeSintoma.enum.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { validarEnum } from '../utils/validateEnum.js';
import { obterMedicoIdAutenticado } from './perfilAcesso.helper.js';

export class SintomaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Sintoma); }
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }

    private async validarAcessoUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });
        if (!utente) throw new Error('Utente nao encontrado');

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) return utente;
        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return utente;
        }
        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar sintomas de outro utente');
            }
            return utente;
        }

        throw new Error('Perfil nao reconhecido');
    }

    private async obterInterno(sintomaId: number): Promise<Sintoma> {
        if (sintomaId <= 0) throw new Error('ID de sintoma invalido');
        const sintoma = await this.repo.findOne({ where: { id: sintomaId } });
        if (!sintoma) throw new Error('Sintoma nao encontrado');
        return sintoma;
    }

    async criar(sintomaData: CreateSintomaDto, utilizador: UtilizadorAutenticado): Promise<SintomaResponseDto> {
        try {
            if (sintomaData.utente_id <= 0) throw new Error('ID do utente deve ser valido');
            if (!sintomaData.descricao || sintomaData.descricao.trim().length === 0) {
                throw new Error('Descricao do sintoma e obrigatoria');
            }
            validarEnum(IntensidadeSintoma, sintomaData.intensidade, 'intensidade');
            await this.validarAcessoUtente(sintomaData.utente_id, utilizador);

            const sintoma = this.repo.create(sintomaData);
            const saved = await this.repo.save(sintoma);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'sintoma',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as SintomaResponseDto;
        } catch (error) {
            console.error('Erro ao criar sintoma:', error);
            throw error;
        }
    }

    async obter(sintomaId: number, utilizador: UtilizadorAutenticado): Promise<SintomaResponseDto> {
        try {
            const sintoma = await this.obterInterno(sintomaId);
            await this.validarAcessoUtente(sintoma.utente_id, utilizador);
            return sintoma as SintomaResponseDto;
        } catch (error) {
            console.error('Erro ao obter sintoma:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<SintomaResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as SintomaResponseDto[];
            }
            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                const utentes = await this.utenteRepo.find({ where: { medico_id: await obterMedicoIdAutenticado(utilizador) } });
                const utenteIds = utentes.map((u) => u.id);
                if (utenteIds.length === 0) return [];
                return await this.repo
                    .createQueryBuilder('sintoma')
                    .where('sintoma.utente_id IN (:...utenteIds)', { utenteIds })
                    .orderBy('sintoma.data_registo', 'DESC')
                    .getMany() as SintomaResponseDto[];
            }

            const utente = await this.utenteRepo.findOne({ where: { utilizador_id: utilizador.id } });
            if (!utente) return [];
            return await this.repo.find({
                where: { utente_id: utente.id },
                order: { data_registo: 'DESC' }
            }) as SintomaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar sintomas:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<SintomaResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente invalido');
            await this.validarAcessoUtente(utenteId, utilizador);
            return await this.repo.find({
                where: { utente_id: utenteId },
                order: { data_registo: 'DESC' }
            }) as SintomaResponseDto[];
        } catch (error) {
            console.error('Erro ao listar sintomas por utente:', error);
            throw error;
        }
    }

    async atualizar(
        sintomaId: number,
        sintomaData: CreateSintomaDto,
        utilizador: UtilizadorAutenticado
    ): Promise<SintomaResponseDto> {
        try {
            if (!sintomaData.descricao || sintomaData.descricao.trim().length === 0) {
                throw new Error('Descricao do sintoma e obrigatoria');
            }
            validarEnum(IntensidadeSintoma, sintomaData.intensidade, 'intensidade');
            const anterior = await this.obterInterno(sintomaId);
            await this.validarAcessoUtente(anterior.utente_id, utilizador);
            await this.validarAcessoUtente(sintomaData.utente_id, utilizador);

            const atualizado = await this.repo.save({ ...anterior, ...sintomaData, id: sintomaId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'sintoma',
                sintomaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado as SintomaResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar sintoma:', error);
            throw error;
        }
    }
}
