/*
 * ============================================================
 * auditoria.service.ts — Serviço de registo de auditoria
 * ============================================================
 *
 * Este service é responsável por registar e consultar o histórico de
 * operações realizadas no sistema. É chamado por outros services sempre
 * que algo importante acontece (criação, alteração ou eliminação de registos).
 *
 * Funções principais:
 *   - registarAuditoria: grava uma nova entrada no log de auditoria
 *   - listar: lista todas as entradas com paginação
 *   - obterHistoricoAuditoria: histórico de um registo específico
 *   - obterDiferencas: mostra o que mudou entre dois estados de um registo
 *   - validarIntegridade: verifica se um registo tem histórico de auditoria
 */
import { AppDataSource } from '../database/data-source.js';
import { Auditoria } from '../models/auditoria.entity.js';
import type { AuditoriaResponseDto } from '../dtos/auditoria/auditoria-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class AuditoriaService {
    // Acesso ao repositório (tabela) de auditoria na base de dados
    private get repo() { return AppDataSource.getRepository(Auditoria); }

    /*
     * registarAuditoria — Grava uma nova entrada no log de auditoria
     *
     * É chamada por outros services após cada operação importante.
     * Parâmetros:
     *   - utilizadorId: quem fez a operação
     *   - tabela: em que tabela foi feita a operação (ex: "prescricao")
     *   - tabelaId: ID do registo afetado
     *   - operacao: CRIACAO, ALTERACAO ou ELIMINACAO
     *   - valorAntigo: dados antes da alteração (null se for uma criação)
     *   - valorNovo: dados depois da alteração (null se for uma eliminação)
     */
    async registarAuditoria(
        utilizadorId: number,
        tabela: string,
        tabelaId: number,
        operacao: OperacaoAuditoria,
        valorAntigo: string | null,
        valorNovo: string | null
    ): Promise<AuditoriaResponseDto> {
        try {
            if (!tabela || tabela.trim().length === 0) throw new Error('Nome da tabela é obrigatório');
            if (tabelaId <= 0) throw new Error('ID da tabela deve ser maior que 0');
            if (!operacao) throw new Error('Operação é obrigatória');

            const auditoria = this.repo.create({
                utilizador_id: utilizadorId,
                tabela,
                tabela_id: tabelaId,
                operacao,
                valor_anterior: valorAntigo,
                valor_novo: valorNovo
            });
            const saved = await this.repo.save(auditoria);
            console.log(`[AUDITORIA] ${operacao} em ${tabela} (ID: ${tabelaId}) por utilizador ${utilizadorId}`);
            return saved as unknown as AuditoriaResponseDto;
        } catch (error) {
            console.error('Erro ao registar auditoria:', error);
            throw error;
        }
    }

    async obter(auditoriaId: number): Promise<AuditoriaResponseDto> {
        try {
            if (auditoriaId <= 0) throw new Error('ID de auditoria inválido');
            const auditoria = await this.repo.findOne({ where: { log_id: auditoriaId } });
            if (!auditoria) throw new Error('Auditoria não encontrada');
            return auditoria as unknown as AuditoriaResponseDto;
        } catch (error) {
            console.error('Erro ao obter auditoria:', error);
            throw error;
        }
    }

    async obterHistoricoAuditoria(tabela: string, tabelaId: number): Promise<AuditoriaResponseDto[]> {
        try {
            if (!tabela || tabela.trim().length === 0) throw new Error('Nome da tabela é obrigatório');
            if (tabelaId <= 0) throw new Error('ID da tabela deve ser maior que 0');
            const result = await this.repo.find({
                where: { tabela, tabela_id: tabelaId },
                order: { timestamp: 'DESC' }
            });
            return result as unknown as AuditoriaResponseDto[];
        } catch (error) {
            console.error('Erro ao obter histórico de auditoria:', error);
            throw error;
        }
    }

    async obterAuditoriasPorUtilizador(utilizadorId: number, _filtros?: { dataInicio?: Date; dataFim?: Date; tabela?: string; operacao?: OperacaoAuditoria; }): Promise<AuditoriaResponseDto[]> {
        try {
            if (utilizadorId <= 0) throw new Error('ID do utilizador inválido');
            const result = await this.repo.find({ where: { utilizador_id: utilizadorId } });
            return result as unknown as AuditoriaResponseDto[];
        } catch (error) {
            console.error('Erro ao obter auditorias por utilizador:', error);
            throw error;
        }
    }

    async obterAuditoriasPorTabela(tabela: string, _filtros?: any): Promise<AuditoriaResponseDto[]> {
        try {
            if (!tabela || tabela.trim().length === 0) throw new Error('Nome da tabela é obrigatório');
            const result = await this.repo.find({ where: { tabela } });
            return result as unknown as AuditoriaResponseDto[];
        } catch (error) {
            console.error('Erro ao obter auditorias por tabela:', error);
            throw error;
        }
    }

    async obterAuditoriasPorOperacao(operacao: OperacaoAuditoria, _filtros?: any): Promise<AuditoriaResponseDto[]> {
        try {
            if (!operacao) throw new Error('Operação é obrigatória');
            const result = await this.repo.find({ where: { operacao } });
            return result as unknown as AuditoriaResponseDto[];
        } catch (error) {
            console.error('Erro ao obter auditorias por operação:', error);
            throw error;
        }
    }

    async apagar(logId: number): Promise<void> {
        try {
            if (logId <= 0) throw new Error('ID de auditoria inválido');
            await this.repo.delete(logId);
            console.log(`[AUDITORIA] Apagado log ${logId}`);
        } catch (error) {
            console.error('Erro ao apagar auditoria:', error);
            throw error;
        }
    }

    /*
     * listar — Lista todas as entradas de auditoria com paginação
     *
     * Paginação: em vez de devolver todos os registos de uma vez (pode ser
     * muito lento com muitos dados), devolve uma "página" de cada vez.
     * Parâmetros:
     *   - pagina: número da página (começa em 1)
     *   - limite: quantos registos por página (máximo 100)
     *   - ordenacao: 'DESC' mostra os mais recentes primeiro
     */
    async listar(pagina: number = 1, limite: number = 20, ordenacao: 'ASC' | 'DESC' = 'DESC'): Promise<{ total: number; pagina: number; limite: number; auditorias: AuditoriaResponseDto[]; }> {
        try {
            if (pagina < 1) throw new Error('Número de página deve ser maior que 0');
            if (limite < 1 || limite > 100) throw new Error('Limite deve estar entre 1 e 100');
            const [auditorias, total] = await this.repo.findAndCount({
                order: { timestamp: ordenacao },
                skip: (pagina - 1) * limite,
                take: limite
            });
            return { total, pagina, limite, auditorias: auditorias as unknown as AuditoriaResponseDto[] };
        } catch (error) {
            console.error('Erro ao listar auditorias:', error);
            throw error;
        }
    }

    /*
     * obterDiferencas — Compara o estado antes e depois de uma alteração
     *
     * Útil para mostrar ao utilizador "o que mudou" numa determinada operação.
     * Por exemplo: "o campo 'estado' mudou de 'ATIVO' para 'EXPIRADO'".
     * Devolve uma lista de campos que foram alterados, com os valores antes e depois.
     */
    async obterDiferencas(auditoriaId: number): Promise<any> {
        try {
            const auditoria = await this.obter(auditoriaId);
            if (!auditoria.valor_anterior || !auditoria.valor_novo) {
                return { anterior: null, novo: null, diferenças: [] };
            }
            try {
                const anterior = JSON.parse(String(auditoria.valor_anterior));
                const novo = JSON.parse(String(auditoria.valor_novo));
                const diferenças: any[] = [];
                for (const chave in novo) {
                    if (anterior[chave] !== novo[chave]) {
                        diferenças.push({ campo: chave, anterior: anterior[chave], novo: novo[chave] });
                    }
                }
                for (const chave in anterior) {
                    if (!(chave in novo)) {
                        diferenças.push({ campo: chave, anterior: anterior[chave], novo: undefined, removido: true });
                    }
                }
                return { anterior, novo, diferenças };
            } catch {
                return { anterior: auditoria.valor_anterior, novo: auditoria.valor_novo, formato: 'string' };
            }
        } catch (error) {
            console.error('Erro ao obter diferenças:', error);
            throw error;
        }
    }

    async validarIntegridade(tabela: string, tabelaId: number): Promise<{ valido: boolean; avisos: string[] }> {
        try {
            const avisos: string[] = [];
            const historico = await this.obterHistoricoAuditoria(tabela, tabelaId);
            if (historico.length === 0) {
                avisos.push(`Nenhuma auditoria encontrada para ${tabela} (ID: ${tabelaId})`);
            }
            return { valido: avisos.length === 0, avisos };
        } catch (error) {
            console.error('Erro ao validar integridade:', error);
            throw error;
        }
    }
}
