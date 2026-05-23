import { AppDataSource } from '../database/data-source.js';
import { Medicacao } from '../models/medicacao.entity.js';
import { Prescricao } from '../models/prescricao.entity.js';
import { Utente } from '../models/utente.entity.js';
import type { CreateMedicacaoDto } from '../dtos/medicacao/create-medicacao.dto.js';
import type { MedicacaoResponseDto } from '../dtos/medicacao/medicacao-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class MedicacaoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Medicacao); }
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

        throw new Error('Acesso negado: perfil sem permissao para medicacao');
    }

    private async obterInterna(medicacaoId: number): Promise<Medicacao> {
        if (medicacaoId <= 0) {
            throw new Error('ID de medicacao invalido');
        }

        const medicacao = await this.repo.findOne({ where: { id: medicacaoId } });
        if (!medicacao) {
            throw new Error('Medicacao nao encontrada');
        }

        return medicacao;
    }

    async criar(medicacaoData: CreateMedicacaoDto, utilizador: UtilizadorAutenticado): Promise<MedicacaoResponseDto> {
        try {
            if (!medicacaoData.nome || medicacaoData.nome.trim().length === 0) {
                throw new Error('Nome da medicacao e obrigatorio');
            }

            await this.validarAcessoPrescricao(medicacaoData.prescricao_id, utilizador);

            const medicacao = this.repo.create(medicacaoData);
            const saved = await this.repo.save(medicacao);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'medicacao',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved as MedicacaoResponseDto;
        } catch (error) {
            console.error('Erro ao criar medicacao:', error);
            throw error;
        }
    }

    async obter(medicacaoId: number, utilizador: UtilizadorAutenticado): Promise<MedicacaoResponseDto> {
        try {
            const medicacao = await this.obterInterna(medicacaoId);
            await this.validarAcessoPrescricao(medicacao.prescricao_id, utilizador);
            return medicacao as MedicacaoResponseDto;
        } catch (error) {
            console.error('Erro ao obter medicacao:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<MedicacaoResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as MedicacaoResponseDto[];
            }

            const prescricoes = await this.prescricaoRepo.find({ where: { medico_id: utilizador.id } });
            const prescricaoIds = prescricoes.map((prescricao) => prescricao.id);
            if (prescricaoIds.length === 0) {
                return [];
            }

            return await this.repo
                .createQueryBuilder('medicacao')
                .where('medicacao.prescricao_id IN (:...prescricaoIds)', { prescricaoIds })
                .getMany() as MedicacaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicacoes:', error);
            throw error;
        }
    }

    async listarPorPrescricao(prescricaoId: number, utilizador: UtilizadorAutenticado): Promise<MedicacaoResponseDto[]> {
        try {
            await this.validarAcessoPrescricao(prescricaoId, utilizador);
            return await this.repo.find({ where: { prescricao_id: prescricaoId } }) as MedicacaoResponseDto[];
        } catch (error) {
            console.error('Erro ao listar medicacoes por prescricao:', error);
            throw error;
        }
    }

    async atualizar(
        medicacaoId: number,
        medicacaoData: CreateMedicacaoDto,
        utilizador: UtilizadorAutenticado
    ): Promise<MedicacaoResponseDto> {
        try {
            const anterior = await this.obterInterna(medicacaoId);
            await this.validarAcessoPrescricao(anterior.prescricao_id, utilizador);
            await this.validarAcessoPrescricao(medicacaoData.prescricao_id, utilizador);

            const atualizada = await this.repo.save({ ...anterior, ...medicacaoData, id: medicacaoId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'medicacao',
                medicacaoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as MedicacaoResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar medicacao:', error);
            throw error;
        }
    }
}
