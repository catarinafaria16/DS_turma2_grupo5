/*
 * ============================================================
 * utente.service.ts — Serviço de gestão de utentes (pacientes)
 * ============================================================
 *
 * Este service contém toda a lógica de negócio relacionada com utentes.
 * Trata de operações como criar, listar, atualizar e apagar utentes,
 * sempre com verificação das permissões de acesso.
 *
 * Regras de acesso:
 *   - ADMINISTRADOR: acesso a todos os utentes
 *   - MÉDICO: só vê e edita os seus próprios utentes
 *   - UTENTE: só vê e edita os seus próprios dados (e apenas morada/contacto)
 *
 * Após cada operação importante, regista na auditoria quem fez o quê.
 */
import { AppDataSource } from '../database/data-source.js';
import { Utente } from '../models/utente.entity.js';
import { Medico } from '../models/medico.entity.js';
import { Utilizador } from '../models/utilizador.entity.js';
import type { CreateUtenteDto } from '../dtos/utente/create-utente.dto.js';
import type { UtenteResponseDto } from '../dtos/utente/utente-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { obterMedicoIdAutenticado } from './perfilAcesso.helper.js';

export class UtenteService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(Utente); }
    private get medicoRepo() { return AppDataSource.getRepository(Medico); }
    private get utilizadorRepo() { return AppDataSource.getRepository(Utilizador); }

    /*
     * validarAcesso — Verifica se o utilizador tem permissão para aceder a um utente
     *
     * Regras:
     *   - ADMINISTRADOR: pode aceder a qualquer utente
     *   - MÉDICO: só pode aceder a utentes que são seus
     *   - UTENTE: só pode aceder aos seus próprios dados
     * Se não tiver permissão, lança um erro que o controller converte em resposta 403.
     */
    private async validarAcesso(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        const utente = await this.repo.findOne({ where: { id: utenteId } });

        if (!utente) {
            throw new Error('Utente nao encontrado');
        }

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return utente;
        }

        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar dados de outro utente');
            }
            return utente;
        }

        throw new Error('Perfil nao reconhecido');
    }

    // Valida se o número de contacto é um número de telefone português válido
    // Aceita números com ou sem prefixo +351, começados por 2, 3 ou 9
    private validarContacto(contacto: string): boolean {
        return /^(\+351)?[239]\d{8}$/.test(contacto.replace(/\s/g, ''));
    }

    // Valida se a data de nascimento é válida e não é no futuro
    private validarDataNascimento(dataNascimento: Date): void {
        const nascimento = new Date(dataNascimento);
        if (Number.isNaN(nascimento.getTime())) {
            throw new Error('Data de nascimento invalida');
        }

        const hoje = new Date();
        nascimento.setHours(0, 0, 0, 0);
        hoje.setHours(0, 0, 0, 0);

        if (nascimento > hoje) {
            throw new Error('Data de nascimento nao pode ser posterior ao dia atual');
        }
    }

    /*
     * criar — Cria um novo utente na base de dados
     *
     * Validações realizadas:
     *   - IDs de utilizador e médico devem ser válidos
     *   - Morada e contacto são obrigatórios
     *   - Número de utente deve ser único no sistema
     *   - O utilizador associado deve ter perfil UTENTE
     *   - Um médico só pode criar utentes para si próprio
     * Após criação, regista na auditoria.
     */
    async criar(utenteData: CreateUtenteDto, utilizador: UtilizadorAutenticado): Promise<UtenteResponseDto> {
        try {
            // RNF004: valida campos obrigatorios e associacoes antes da criacao.
            if (!utenteData.utilizador_id || utenteData.utilizador_id <= 0) {
                throw new Error('ID de utilizador invalido');
            }
            if (!utenteData.medico_id || utenteData.medico_id <= 0) {
                throw new Error('ID de medico invalido');
            }
            if (!utenteData.morada || utenteData.morada.trim().length === 0) {
                throw new Error('Morada e obrigatoria');
            }
            if (!utenteData.contacto || utenteData.contacto.trim().length === 0) {
                throw new Error('Contacto e obrigatorio');
            }
            if (!this.validarContacto(utenteData.contacto)) {
                throw new Error('Contacto invalido');
            }
            this.validarDataNascimento(utenteData.data_nascimento);

            if (utilizador.perfil === PerfilUtilizador.MEDICO && utenteData.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: medico so pode criar utentes para si');
            }

            const medico = await this.medicoRepo.findOne({ where: { id: utenteData.medico_id } });
            if (!medico) {
                throw new Error('Medico nao encontrado');
            }

            const utilizadorAssociado = await this.utilizadorRepo.findOne({ where: { id: utenteData.utilizador_id } });
            if (!utilizadorAssociado) {
                throw new Error('Utilizador associado ao utente nao encontrado');
            }
            if (utilizadorAssociado.perfil !== PerfilUtilizador.UTENTE) {
                throw new Error('Utilizador associado deve ter perfil utente');
            }

            const existeNrUtente = await this.repo.findOne({ where: { nr_utente: utenteData.nr_utente } });
            if (existeNrUtente) {
                throw new Error('Numero de utente ja existe no sistema');
            }

            const existeUtilizadorAssociado = await this.repo.findOne({ where: { utilizador_id: utenteData.utilizador_id } });
            if (existeUtilizadorAssociado) {
                throw new Error('Utilizador ja esta associado a um utente');
            }

            const utente = this.repo.create(utenteData);
            const saved = await this.repo.save(utente);

            await this.auditoriaService.registarAuditoria(
                utilizador.id,
                'utente',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            );

            return saved;
        } catch (error) {
            console.error('Erro ao criar utente:', error);
            throw error;
        }
    }

    // listar — Devolve a lista de utentes visíveis para o utilizador autenticado
    // (todos para admin, só os seus para médico, só o próprio para utente)
    async listar(utilizador: UtilizadorAutenticado): Promise<UtenteResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find();
            }

            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                return await this.repo.find({ where: { medico_id: await obterMedicoIdAutenticado(utilizador) } });
            }

            if (utilizador.perfil === PerfilUtilizador.UTENTE) {
                const utente = await this.repo.findOne({ where: { utilizador_id: utilizador.id } });
                return utente ? [utente] : [];
            }

            throw new Error('Acesso negado: perfil nao pode listar utentes');
        } catch (error) {
            console.error('Erro ao listar utentes:', error);
            throw error;
        }
    }

    async obter(utenteId: number, utilizador: UtilizadorAutenticado): Promise<UtenteResponseDto> {
        try {
            if (utenteId <= 0) throw new Error('ID de utente invalido');
            return this.validarAcesso(utenteId, utilizador);
        } catch (error) {
            console.error('Erro ao obter utente:', error);
            throw error;
        }
    }

    async atualizar(
        utenteId: number,
        utenteData: Partial<CreateUtenteDto>,
        utilizador: UtilizadorAutenticado
    ): Promise<UtenteResponseDto> {
        try {
            const anterior = await this.validarAcesso(utenteId, utilizador);

            // RNF004: Utente so pode alterar morada e contacto.
            if (utilizador.perfil === PerfilUtilizador.UTENTE) {
                const dadosEditaveis: Partial<CreateUtenteDto> = {};

                if (utenteData.morada !== undefined) {
                    dadosEditaveis.morada = utenteData.morada;
                }
                if (utenteData.contacto !== undefined) {
                    if (!this.validarContacto(utenteData.contacto)) {
                        throw new Error('Contacto invalido');
                    }
                    dadosEditaveis.contacto = utenteData.contacto;
                }

                const atualizado = await this.repo.save({ ...anterior, ...dadosEditaveis, id: utenteId });
                if (JSON.stringify(anterior) === JSON.stringify(atualizado)) {
                    return atualizado;
                }
                await this.auditoriaService.registarAuditoria(
                    utilizador.id,
                    'utente',
                    utenteId,
                    OperacaoAuditoria.ALTERACAO,
                    JSON.stringify(anterior),
                    JSON.stringify(atualizado)
                );
                return atualizado;
            }

            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                if (utenteData.medico_id !== undefined && utenteData.medico_id !== await obterMedicoIdAutenticado(utilizador)) {
                    throw new Error('Medico nao pode alterar o medico responsavel');
                }
                delete utenteData.medico_id;
            }

            if (utenteData.contacto !== undefined && !this.validarContacto(utenteData.contacto)) {
                throw new Error('Contacto invalido');
            }

            if (utenteData.medico_id !== undefined) {
                const medico = await this.medicoRepo.findOne({ where: { id: utenteData.medico_id } });
                if (!medico) {
                    throw new Error('Medico nao encontrado');
                }
            }

            if (utenteData.utilizador_id !== undefined && utenteData.utilizador_id !== anterior.utilizador_id) {
                const existeUtilizadorAssociado = await this.repo.findOne({ where: { utilizador_id: utenteData.utilizador_id } });
                if (existeUtilizadorAssociado) {
                    throw new Error('Utilizador ja esta associado a outro utente');
                }
            }

            const atualizado = await this.repo.save({ ...anterior, ...utenteData, id: utenteId });
            if (JSON.stringify(anterior) === JSON.stringify(atualizado)) {
                return atualizado;
            }
            await this.auditoriaService.registarAuditoria(
                utilizador.id,
                'utente',
                utenteId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizado)
            );
            return atualizado;
        } catch (error) {
            console.error('Erro ao atualizar utente:', error);
            throw error;
        }
    }

    async listarPorMedico(medicoId: number, utilizador: UtilizadorAutenticado): Promise<UtenteResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.MEDICO && medicoId !== await obterMedicoIdAutenticado(utilizador)) {
                throw new Error('Acesso negado: nao pode ver utentes de outro medico');
            }
            return await this.repo.find({ where: { medico_id: medicoId } });
        } catch (error) {
            console.error('Erro ao listar utentes por medico:', error);
            throw error;
        }
    }

    async historicoClinico(
        utenteId: number,
        utilizador: UtilizadorAutenticado
    ): Promise<{
        utente_id: number;
        avaliacoes_carat: unknown[];
        alertas: unknown[];
        medicacoes: unknown[];
        exames: unknown[];
        sintomas: unknown[];
        anamnese: unknown;
    }> {
        try {
            await this.validarAcesso(utenteId, utilizador);
            return {
                utente_id: utenteId,
                avaliacoes_carat: [],
                alertas: [],
                medicacoes: [],
                exames: [],
                sintomas: [],
                anamnese: null
            };
        } catch (error) {
            console.error('Erro ao obter historico clinico:', error);
            throw error;
        }
    }

    /*
     * apagar — Apaga "logicamente" um utente (soft delete)
     *
     * O registo NÃO é removido da base de dados — apenas o campo deleted_at
     * é preenchido com a data atual. Isto mantém o histórico e permite recuperação.
     * Após a operação, o utente deixa de aparecer nas listagens normais.
     */
    async apagar(utenteId: number, utilizador: UtilizadorAutenticado): Promise<void> {
        try {
            await this.validarAcesso(utenteId, utilizador);
            // softDelete: não apaga o registo, apenas preenche o campo deleted_at
            await this.repo.softDelete(utenteId);

            const anterior = await this.repo.findOne({ where: { id: utenteId }, withDeleted: true });
            await this.auditoriaService.registarAuditoria(
                utilizador.id,
                'utente',
                utenteId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(anterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar utente:', error);
            throw error;
        }
    }
}
