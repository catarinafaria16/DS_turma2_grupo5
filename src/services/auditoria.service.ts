import type { CreateAuditoriaDto } from '../dtos/auditoria/create-auditoria.dto';
import type { AuditoriaResponseDto } from '../dtos/auditoria/auditoria-response.dto';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class AuditoriaService {

    /**
     * RF039: O sistema deve registar um histórico mínimo de auditoria indicando que utilizador criou ou alterou cada registo
     * RNF002: Registar auditoria de todas as operações CRUD
     * 
     * Registar uma entrada de auditoria
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
            // Validações
            if (!tabela || tabela.trim().length === 0) {
                throw new Error('Nome da tabela é obrigatório');
            }

            if (tabelaId <= 0) {
                throw new Error('ID da tabela deve ser maior que 0');
            }

            if (!operacao) {
                throw new Error('Operação é obrigatória');
            }

            // RNF002: Guardar versão anterior e nova versão
            const novaAuditoria: AuditoriaResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                utilizador_id: utilizadorId,
                tabela,
                tabela_id: tabelaId,
                operacao,
                valor_antigo: valorAntigo,
                valor_novo: valorNovo
            };

            // TODO: Inserir na base de dados
            // TODO: Adicionar timestamp (data_criacao)
            console.log(`[AUDITORIA] ${operacao} em ${tabela} (ID: ${tabelaId}) por utilizador ${utilizadorId}`);

            return novaAuditoria;
        } catch (error) {
            console.error('Erro ao registar auditoria:', error);
            throw error;
        }
    }

    /**
     * Obter auditoria por ID
     */
    async obter(auditoriaId: number): Promise<AuditoriaResponseDto> {
        try {
            if (auditoriaId <= 0) {
                throw new Error('ID de auditoria inválido');
            }

            // TODO: Buscar na base de dados
            const auditoria: AuditoriaResponseDto = {
                id: auditoriaId,
                utilizador_id: 0,
                tabela: '',
                tabela_id: 0,
                operacao: OperacaoAuditoria.ALTERACAO,
                valor_antigo: null,
                valor_novo: null
            };
            return auditoria;
        } catch (error) {
            console.error('Erro ao obter auditoria:', error);
            throw error;
        }
    }

    /**
     * RF039: Obter histórico de auditoria para um registo específico
     * RNF002: Consultar versões anteriores e alterações realizadas
     */
    async obterHistoricoAuditoria(
        tabela: string,
        tabelaId: number
    ): Promise<AuditoriaResponseDto[]> {
        try {
            if (!tabela || tabela.trim().length === 0) {
                throw new Error('Nome da tabela é obrigatório');
            }

            if (tabelaId <= 0) {
                throw new Error('ID da tabela deve ser maior que 0');
            }

            // TODO: Buscar todas as auditorias para este registo, ordenadas por data (descendente)
            const auditorias: AuditoriaResponseDto[] = [];
            return auditorias;
        } catch (error) {
            console.error('Erro ao obter histórico de auditoria:', error);
            throw error;
        }
    }

    /**
     * RNF002: Obter todas as auditorias de um utilizador
     * Útil para rastreio de ações realizadas por um utilizador específico
     */
    async obterAuditoriasPorUtilizador(
        utilizadorId: number,
        filtros?: {
            dataInicio?: Date;
            dataFim?: Date;
            tabela?: string;
            operacao?: OperacaoAuditoria;
        }
    ): Promise<AuditoriaResponseDto[]> {
        try {
            if (utilizadorId <= 0) {
                throw new Error('ID do utilizador inválido');
            }

            // TODO: Buscar auditorias do utilizador
            // TODO: Aplicar filtros se fornecidos
            const auditorias: AuditoriaResponseDto[] = [];
            return auditorias;
        } catch (error) {
            console.error('Erro ao obter auditorias por utilizador:', error);
            throw error;
        }
    }

    /**
     * Obter todas as auditorias de uma tabela específica
     * Útil para análise de alterações em um tipo de registo
     */
    async obterAuditoriasPorTabela(
        tabela: string,
        filtros?: {
            dataInicio?: Date;
            dataFim?: Date;
            operacao?: OperacaoAuditoria;
            utilizadorId?: number;
        }
    ): Promise<AuditoriaResponseDto[]> {
        try {
            if (!tabela || tabela.trim().length === 0) {
                throw new Error('Nome da tabela é obrigatório');
            }

            // TODO: Buscar auditorias da tabela
            // TODO: Aplicar filtros se fornecidos
            const auditorias: AuditoriaResponseDto[] = [];
            return auditorias;
        } catch (error) {
            console.error('Erro ao obter auditorias por tabela:', error);
            throw error;
        }
    }

    /**
     * RNF002: Obter auditorias por tipo de operação
     * Filtrar por CRIACAO, ALTERACAO, ELIMINACAO
     */
    async obterAuditoriasPorOperacao(
        operacao: OperacaoAuditoria,
        filtros?: {
            dataInicio?: Date;
            dataFim?: Date;
            tabela?: string;
        }
    ): Promise<AuditoriaResponseDto[]> {
        try {
            if (!operacao) {
                throw new Error('Operação é obrigatória');
            }

            // TODO: Buscar auditorias da operação
            // TODO: Aplicar filtros se fornecidos
            const auditorias: AuditoriaResponseDto[] = [];
            return auditorias;
        } catch (error) {
            console.error('Erro ao obter auditorias por operação:', error);
            throw error;
        }
    }

    /**
     * Listar todas as auditorias com paginação
     */
    async listar(
        pagina: number = 1,
        limite: number = 20,
        ordenacao: 'ASC' | 'DESC' = 'DESC'
    ): Promise<{
        total: number;
        pagina: number;
        limite: number;
        auditorias: AuditoriaResponseDto[];
    }> {
        try {
            if (pagina < 1) {
                throw new Error('Número de página deve ser maior que 0');
            }

            if (limite < 1 || limite > 100) {
                throw new Error('Limite deve estar entre 1 e 100');
            }

            // TODO: Buscar auditorias com paginação
            // TODO: Aplicar ordenação
            return {
                total: 0,
                pagina,
                limite,
                auditorias: []
            };
        } catch (error) {
            console.error('Erro ao listar auditorias:', error);
            throw error;
        }
    }

    /**
     * RNF002: Verificar alterações entre duas versões
     * Comparar valor_antigo e valor_novo para uma auditoria
     */
    async obterDiferencas(auditoriaId: number): Promise<any> {
        try {
            const auditoria = await this.obter(auditoriaId);

            if (!auditoria.valor_antigo || !auditoria.valor_novo) {
                return {
                    anterior: null,
                    novo: null,
                    diferenças: []
                };
            }

            try {
                const anterior = JSON.parse(auditoria.valor_antigo);
                const novo = JSON.parse(auditoria.valor_novo);

                // Encontrar as diferenças
                const diferenças: any[] = [];
                
                // Comparar campos da versão nova
                for (const chave in novo) {
                    if (anterior[chave] !== novo[chave]) {
                        diferenças.push({
                            campo: chave,
                            anterior: anterior[chave],
                            novo: novo[chave]
                        });
                    }
                }

                // Verificar campos que foram removidos
                for (const chave in anterior) {
                    if (!(chave in novo)) {
                        diferenças.push({
                            campo: chave,
                            anterior: anterior[chave],
                            novo: undefined,
                            removido: true
                        });
                    }
                }

                return {
                    anterior,
                    novo,
                    diferenças
                };
            } catch (parseError) {
                // Se não conseguir fazer parse JSON, retorna valores como strings
                return {
                    anterior: auditoria.valor_antigo,
                    novo: auditoria.valor_novo,
                    formato: 'string'
                };
            }
        } catch (error) {
            console.error('Erro ao obter diferenças:', error);
            throw error;
        }
    }

    /**
     * RF043: Registar logs do sistema
     * Criar um relatório de auditoria para um período
     */
    async gerarRelatorioPeriodo(
        dataInicio: Date,
        dataFim: Date
    ): Promise<any> {
        try {
            if (dataInicio > dataFim) {
                throw new Error('Data de início não pode ser posterior à data de fim');
            }

            // TODO: Buscar todas as auditorias no período
            const auditorias: AuditoriaResponseDto[] = [];

            // Agregações
            const resumo = {
                totalAuditorias: auditorias.length,
                porOperacao: {
                    criacao: auditorias.filter(a => a.operacao === OperacaoAuditoria.CRIACAO).length,
                    alteracao: auditorias.filter(a => a.operacao === OperacaoAuditoria.ALTERACAO).length,
                    eliminacao: auditorias.filter(a => a.operacao === OperacaoAuditoria.ELIMINACAO).length
                },
                porTabela: {} as Record<string, number>,
                porUtilizador: {} as Record<number, number>
            };

            // Contar por tabela
            auditorias.forEach(a => {
                resumo.porTabela[a.tabela] = (resumo.porTabela[a.tabela] || 0) + 1;
                resumo.porUtilizador[a.utilizador_id] = (resumo.porUtilizador[a.utilizador_id] || 0) + 1;
            });

            return {
                periodo: { inicio: dataInicio, fim: dataFim },
                resumo,
                auditorias
            };
        } catch (error) {
            console.error('Erro ao gerar relatório de auditoria:', error);
            throw error;
        }
    }

    /**
     * Limpar auditorias antigas
     * RNF002: Manter histórico de auditoria
     * TODO: Definir política de retenção (ex: guardar 2 anos)
     */
    async limparAuditorhasAntigas(diasRetencao: number = 730): Promise<number> {
        try {
            if (diasRetencao < 1) {
                throw new Error('Dias de retenção deve ser maior que 0');
            }

            // TODO: Calcular data limite
            // TODO: Apagar auditorias anteriores a essa data
            console.log(`Limpando auditorias com mais de ${diasRetencao} dias`);

            const totalApagadas = 0; // TODO: Retornar total de registos apagados
            return totalApagadas;
        } catch (error) {
            console.error('Erro ao limpar auditorias antigas:', error);
            throw error;
        }
    }

    /**
     * Validar integridade de auditoria
     * Verificar se todas as operações críticas foram registadas
     */
    async validarIntegridade(
        tabela: string,
        tabelaId: number
    ): Promise<{
        valido: boolean;
        avisos: string[];
    }> {
        try {
            const avisos: string[] = [];
            const historico = await this.obterHistoricoAuditoria(tabela, tabelaId);

            if (historico.length === 0) {
                avisos.push(`Nenhuma auditoria encontrada para ${tabela} (ID: ${tabelaId})`);
            }

            // TODO: Validações adicionais de integridade

            return {
                valido: avisos.length === 0,
                avisos
            };
        } catch (error) {
            console.error('Erro ao validar integridade:', error);
            throw error;
        }
    }
}
