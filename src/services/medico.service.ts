import { AppDataSource } from '../database/data-source.js';
import { Medico } from '../models/medico.entity.js';
import { Utilizador } from '../models/utilizador.entity.js';
import type { CreateMedicoDto } from '../dtos/medico/create-medico.dto.js';
import type { MedicoResponseDto } from '../dtos/medico/medico-response.dto.js';
import { EspecialidadeMedico } from '../enums/EspecialidadeMedico.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { validarEnum } from '../utils/validateEnum.js';

export class MedicoService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Medico); }
    private get utilizadorRepo() { return AppDataSource.getRepository(Utilizador); }

    private validarContacto(contacto: string): boolean {
        return /^(\+351)?[239]\d{8}$/.test(contacto.replace(/\s/g, ''));
    }

    private async validarAcesso(medicoId: number, utilizador: UtilizadorAutenticado): Promise<Medico> {
        const medico = await this.repo.findOne({ where: { id: medicoId } });

        if (!medico) {
            throw new Error('Medico nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return medico;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (medico.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar outro medico');
            }
            return medico;
        }

        throw new Error('Acesso negado: perfil sem permissao para medicos');
    }

    private async validarUtilizadorAssociado(utilizadorId: number, medicoIdAtual?: number): Promise<void> {
        const utilizador = await this.utilizadorRepo.findOne({ where: { id: utilizadorId } });
        if (!utilizador) {
            throw new Error('Utilizador associado ao medico nao encontrado');
        }
        if (utilizador.perfil !== PerfilUtilizador.MEDICO) {
            throw new Error('Utilizador associado deve ter perfil medico');
        }

        const medicoExistente = await this.repo.findOne({ where: { utilizador_id: utilizadorId } });
        if (medicoExistente && medicoExistente.id !== medicoIdAtual) {
            throw new Error('Utilizador ja esta associado a outro medico');
        }
    }

    async criar(medicoData: CreateMedicoDto, utilizador: UtilizadorAutenticado): Promise<MedicoResponseDto> {
        try {
            // RNF004: valida os campos obrigatorios e a associacao ao utilizador.
            if (medicoData.utilizador_id <= 0) {
                throw new Error('ID do utilizador deve ser valido');
            }
            if (medicoData.id !== undefined) {
                if (medicoData.id <= 0) {
                    throw new Error('ID do medico deve ser valido');
                }
                if (medicoData.id !== medicoData.utilizador_id) {
                    throw new Error('ID do medico deve coincidir com o ID do utilizador');
                }
                const medicoComMesmoId = await this.repo.findOne({ where: { id: medicoData.id } });
                if (medicoComMesmoId) {
                    throw new Error('ID ja esta atribuido a outro medico');
                }
            }
            if (!medicoData.numero_cedula_medica || medicoData.numero_cedula_medica <= 0) {
                throw new Error('Numero de cedula medica deve ser valido');
            }
            if (!medicoData.contacto || medicoData.contacto.trim().length === 0) {
                throw new Error('Contacto e obrigatorio');
            }
            if (!this.validarContacto(medicoData.contacto)) {
                throw new Error('Contacto invalido');
            }
            if (!medicoData.especialidade || String(medicoData.especialidade).trim().length === 0) {
                throw new Error('Especialidade e obrigatoria');
            }
            validarEnum(EspecialidadeMedico, medicoData.especialidade, 'especialidade');

            await this.validarUtilizadorAssociado(medicoData.utilizador_id);

            const medico = this.repo.create(medicoData);
            const saved = await this.repo.save(medico);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'medico',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return saved;
        } catch (error) {
            console.error('Erro ao criar medico:', error);
            throw error;
        }
    }

    async obter(medicoId: number, utilizador: UtilizadorAutenticado): Promise<MedicoResponseDto> {
        try {
            if (medicoId <= 0) {
                throw new Error('ID de medico invalido');
            }
            return await this.validarAcesso(medicoId, utilizador);
        } catch (error) {
            console.error('Erro ao obter medico:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<MedicoResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find();
            }

            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                const medico = await this.repo.findOne({ where: { utilizador_id: utilizador.id } });
                return medico ? [medico] : [];
            }

            throw new Error('Acesso negado: perfil nao pode listar medicos');
        } catch (error) {
            console.error('Erro ao listar medicos:', error);
            throw error;
        }
    }

    async atualizar(
        medicoId: number,
        medicoData: Partial<CreateMedicoDto>,
        utilizador: UtilizadorAutenticado
    ): Promise<MedicoResponseDto> {
        try {
            const anterior = await this.validarAcesso(medicoId, utilizador);
            let dadosAtualizacao: Partial<CreateMedicoDto> = medicoData;

            // RNF001: o proprio medico so pode alterar o seu contacto.
            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                dadosAtualizacao = {};

                if (medicoData.contacto !== undefined) {
                    if (!this.validarContacto(medicoData.contacto)) {
                        throw new Error('Contacto invalido');
                    }
                    dadosAtualizacao.contacto = medicoData.contacto;
                }
            } else {
                if (medicoData.contacto !== undefined && !this.validarContacto(medicoData.contacto)) {
                    throw new Error('Contacto invalido');
                }
                if (medicoData.utilizador_id !== undefined) {
                    await this.validarUtilizadorAssociado(medicoData.utilizador_id, medicoId);
                }
                if (medicoData.numero_cedula_medica !== undefined && medicoData.numero_cedula_medica !== anterior.numero_cedula_medica) {
                    throw new Error('Numero de cedula medica nao pode ser alterado');
                }
                if (medicoData.especialidade !== undefined) {
                    validarEnum(EspecialidadeMedico, medicoData.especialidade, 'especialidade');
                }
            }

            const atualizado = await this.repo.save({ ...anterior, ...dadosAtualizacao, id: medicoId });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'medico',
                medicoId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizado;
        } catch (error) {
            console.error('Erro ao atualizar medico:', error);
            throw error;
        }
    }

    async listarPorEspecialidade(especialidade: string, utilizador: UtilizadorAutenticado): Promise<MedicoResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                const proprio = await this.repo.findOne({
                    where: {
                        utilizador_id: utilizador.id,
                        especialidade: especialidade as Medico['especialidade']
                    }
                });
                return proprio ? [proprio] : [];
            }

            return await this.repo.find({ where: { especialidade: especialidade as Medico['especialidade'] } });
        } catch (error) {
            console.error('Erro ao listar medicos por especialidade:', error);
            throw error;
        }
    }

    async apagar(medicoId: number, utilizador: UtilizadorAutenticado): Promise<void> {
        try {
            const anterior = await this.validarAcesso(medicoId, utilizador);
            await this.repo.softDelete(medicoId);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'medico',
                medicoId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));
        } catch (error) {
            console.error('Erro ao apagar medico:', error);
            throw error;
        }
    }
}
