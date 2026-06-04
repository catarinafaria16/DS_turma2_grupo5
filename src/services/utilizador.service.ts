/*
 * ============================================================
 * utilizador.service.ts — Serviço de gestão de utilizadores
 * ============================================================
 *
 * Este service gere a criação, consulta, atualização e eliminação de utilizadores.
 * Um utilizador é a conta de acesso ao sistema (tem nome, email, password e perfil).
 *
 * Validações importantes:
 *   - Email deve ser único e ter formato válido
 *   - Password deve ter pelo menos 6 caracteres
 *   - Perfil deve ser um valor válido (ADMIN, MEDICO, UTENTE)
 *
 * Regras de acesso:
 *   - ADMINISTRADOR: pode criar, ver e editar qualquer utilizador
 *   - Outros perfis: só podem ver e editar os seus próprios dados
 *     (e apenas email e password — não podem mudar o perfil)
 */
import { AppDataSource } from '../database/data-source.js';
import { Utilizador } from '../models/utilizador.entity.js';
import type { CreateUtilizadorDto } from '../dtos/utilizador/create-utilizador.dto.js';
import type { UtilizadorResponseDto } from '../dtos/utilizador/utilizador-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../enums/GeneroUtilizador.enum.js';
import { validarEnum } from '../utils/validateEnum.js';

export class UtilizadorService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Utilizador); }

    async criar(utilizadorData: CreateUtilizadorDto, utilizadorIdLogado: number): Promise<UtilizadorResponseDto> {
        try {
            // RNF004: valida os campos obrigatorios antes de criar o utilizador.
            if (!utilizadorData.nome || utilizadorData.nome.trim().length === 0) {
                throw new Error('Nome do utilizador e obrigatorio');
            }
            if (!utilizadorData.email || utilizadorData.email.trim().length === 0) {
                throw new Error('Email do utilizador e obrigatorio');
            }
            this.validarEmail(utilizadorData.email);
            if (!utilizadorData.password || utilizadorData.password.length < 6) {
                throw new Error('Password do utilizador deve ter pelo menos 6 caracteres');
            }
            this.validarPerfil(utilizadorData.perfil);
            if (!utilizadorData.genero) {
                throw new Error('Género do utilizador e obrigatorio');
            }
            validarEnum(GeneroUtilizador, utilizadorData.genero, 'genero');

            if (utilizadorData.id !== undefined) {
                if (utilizadorData.id <= 0) {
                    throw new Error('ID do utilizador deve ser valido');
                }
                const idExistente = await this.repo.findOne({ where: { id: utilizadorData.id } });
                if (idExistente) {
                    throw new Error('ID ja esta atribuido a outro utilizador');
                }
            }

            const emailExistente = await this.repo.findOne({ where: { email: utilizadorData.email } });
            if (emailExistente) {
                throw new Error('Email ja esta atribuido a outro utilizador');
            }

            const utilizador = this.repo.create(utilizadorData);
            const saved = await this.repo.save(utilizador);

            await this.auditoriaService.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            );

            return saved;
        } catch (error) {
            console.error('Erro ao criar utilizador:', error);
            throw error;
        }
    }

    async obter(utilizadorId: number, utilizadorLogado?: UtilizadorAutenticado): Promise<UtilizadorResponseDto> {
        try {
            if (utilizadorId <= 0) throw new Error('ID de utilizador invalido');

            // RNF001: perfis nao administradores so podem consultar o proprio utilizador.
            if (
                utilizadorLogado &&
                utilizadorLogado.perfil !== PerfilUtilizador.ADMINISTRADOR &&
                utilizadorLogado.id !== utilizadorId
            ) {
                throw new Error('Acesso negado: nao pode consultar outro utilizador');
            }

            const utilizador = await this.repo.findOne({ where: { id: utilizadorId } });
            if (!utilizador) throw new Error('Utilizador nao encontrado');
            return utilizador;
        } catch (error) {
            console.error('Erro ao obter utilizador:', error);
            throw error;
        }
    }

    async listar(): Promise<UtilizadorResponseDto[]> {
        try {
            return await this.repo.find();
        } catch (error) {
            console.error('Erro ao listar utilizadores:', error);
            throw error;
        }
    }

    async atualizar(
        utilizadorId: number,
        utilizadorData: Partial<CreateUtilizadorDto>,
        utilizadorLogado: UtilizadorAutenticado
    ): Promise<UtilizadorResponseDto> {
        try {
            const anterior = await this.obter(utilizadorId);
            let dadosAtualizacao: Partial<CreateUtilizadorDto> = utilizadorData;

            // RNF001/RNF004: o proprio utilizador so pode alterar credenciais editaveis.
            if (utilizadorLogado.perfil !== PerfilUtilizador.ADMINISTRADOR) {
                if (utilizadorLogado.id !== utilizadorId) {
                    throw new Error('Acesso negado: nao pode alterar outro utilizador');
                }

                dadosAtualizacao = {};
                if (utilizadorData.email !== undefined) {
                    this.validarEmail(utilizadorData.email);
                    await this.validarEmailUnico(utilizadorData.email, utilizadorId);
                    dadosAtualizacao.email = utilizadorData.email;
                }
                if (utilizadorData.password !== undefined) {
                    if (utilizadorData.password.length < 6) {
                        throw new Error('Password do utilizador deve ter pelo menos 6 caracteres');
                    }
                    dadosAtualizacao.password = utilizadorData.password;
                }
            } else {
                if (utilizadorData.email !== undefined) {
                    this.validarEmail(utilizadorData.email);
                    await this.validarEmailUnico(utilizadorData.email, utilizadorId);
                }
                if (utilizadorData.password !== undefined && utilizadorData.password.length < 6) {
                    throw new Error('Password do utilizador deve ter pelo menos 6 caracteres');
                }
                if (utilizadorData.perfil !== undefined) {
                    this.validarPerfil(utilizadorData.perfil);
                }
                if (utilizadorData.genero !== undefined) {
                    validarEnum(GeneroUtilizador, utilizadorData.genero, 'genero');
                }
            }

            const atualizado = await this.repo.save({ ...anterior, ...dadosAtualizacao, id: utilizadorId });

            await this.auditoriaService.registarAuditoria(
                utilizadorLogado.id,
                'utilizador',
                utilizadorId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            );

            return atualizado;
        } catch (error) {
            console.error('Erro ao atualizar utilizador:', error);
            throw error;
        }
    }

    async apagar(utilizadorId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const anterior = await this.obter(utilizadorId);
            await this.repo.softDelete(utilizadorId);

            await this.auditoriaService.registarAuditoria(
                utilizadorIdLogado,
                'utilizador',
                utilizadorId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar utilizador:', error);
            throw error;
        }
    }

    private validarEmail(email: string): void {
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoEmail.test(email)) {
            throw new Error('Email invalido');
        }
    }

    private validarPerfil(perfil: PerfilUtilizador): void {
        if (!Object.values(PerfilUtilizador).includes(perfil)) {
            throw new Error('Perfil de utilizador invalido');
        }
    }

    private async validarEmailUnico(email: string, utilizadorIdAtual: number): Promise<void> {
        const utilizadorComEmail = await this.repo.findOne({ where: { email } });
        if (utilizadorComEmail && utilizadorComEmail.id !== utilizadorIdAtual) {
            throw new Error('Email ja esta atribuido a outro utilizador');
        }
    }
}
