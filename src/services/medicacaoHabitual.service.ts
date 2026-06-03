import { AppDataSource } from '../database/data-source.js';
import { MedicacaoHabitual } from '../models/medicacaoHabitual.entity.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateMedicacaoHabitualDto } from '../dtos/medicacaoHabitual/create-medicacaoHabitual.dto.js';
import type { MedicacaoHabitualResponseDto } from '../dtos/medicacaoHabitual/medicacaoHabitual-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { obterMedicoIdAutenticado } from './perfilAcesso.helper.js';

export class MedicacaoHabitualService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(MedicacaoHabitual); }
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

        throw new Error('Acesso negado: perfil sem permissao para medicacao habitual');
    }

    private async obterInterna(medicacaoHabitualId: number): Promise<MedicacaoHabitual> {
        if (medicacaoHabitualId <= 0) {
            throw new Error('ID de medicacao habitual invalido');
        }

        const medicacao = await this.repo.findOne({ where: { id: medicacaoHabitualId } });
        if (!medicacao) {
            throw new Error('Medicacao habitual nao encontrada');
        }

        return medicacao;
    }

    async criar(
        medicacaoData: CreateMedicacaoHabitualDto,
        utilizador: UtilizadorAutenticado
    ): Promise<MedicacaoHabitualResponseDto> {
        try {
            if (!medicacaoData.nome || medicacaoData.nome.trim().length === 0) {
                throw new Error('Nome da medicacao habitual e obrigatorio');
            }

            await this.validarAcessoAnamnese(medicacaoData.anamnese_id, utilizador);

            const medicacao = this.repo.create(medicacaoData);
            const saved = await this.repo.save(medicacao);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'medicacao_habitual',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as MedicacaoHabitualResponseDto;
        } catch (error) {
            console.error('Erro ao criar medicacao habitual:', error);
            throw error;
        }
    }

    async obter(medicacaoHabitualId: number, utilizador: UtilizadorAutenticado): Promise<MedicacaoHabitualResponseDto> {
        try {
            const medicacao = await this.obterInterna(medicacaoHabitualId);
            await this.validarAcessoAnamnese(medicacao.anamnese_id, utilizador);
            return medicacao as MedicacaoHabitualResponseDto;
        } catch (error) {
            console.error('Erro ao obter medicacao habitual:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<MedicacaoHabitualResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as MedicacaoHabitualResponseDto[];
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
                .createQueryBuilder('medicacao_habitual')
                .where('medicacao_habitual.anamnese_id IN (:...anamneseIds)', { anamneseIds })
                .getMany() as MedicacaoHabitualResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicacoes habituais:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number, utilizador: UtilizadorAutenticado): Promise<MedicacaoHabitualResponseDto[]> {
        try {
            await this.validarAcessoAnamnese(anamneseId, utilizador);
            return await this.repo.find({ where: { anamnese_id: anamneseId } }) as MedicacaoHabitualResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicacoes habituais por anamnese:', error);
            throw error;
        }
    }

    async atualizar(
        medicacaoHabitualId: number,
        medicacaoData: CreateMedicacaoHabitualDto,
        utilizador: UtilizadorAutenticado
    ): Promise<MedicacaoHabitualResponseDto> {
        try {
            const anterior = await this.obterInterna(medicacaoHabitualId);
            await this.validarAcessoAnamnese(anterior.anamnese_id, utilizador);
            await this.validarAcessoAnamnese(medicacaoData.anamnese_id, utilizador);

            const atualizada = await this.repo.save({ ...anterior, ...medicacaoData, id: medicacaoHabitualId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'medicacao_habitual',
                medicacaoHabitualId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as MedicacaoHabitualResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar medicacao habitual:', error);
            throw error;
        }
    }
}
