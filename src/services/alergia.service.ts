import type { CreateAlergiaDto } from '../dtos/alergia/create-alergia.dto.js';
import type { AlergiaResponseDto } from '../dtos/alergia/alergia-response.dto.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { AuditoriaService } from './auditoria.service.js';

export class AlergiaService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    /**
     * RF035: Permitir ao Utente registar alergias
     * Registar nova alergia para um utente
     */
    async registarAlergia(
        utenteId: number,
        descricao: string,
        intensidade_crise: string,
        frequencia_crise: string,
        utilizadorIdLogado: number
    ): Promise<AlergiaResponseDto> {
        try {
            // Validações
            if (!descricao || descricao.trim().length === 0) {
                throw new Error('Descrição da alergia é obrigatória');
            }

            if (!intensidade_crise || intensidade_crise.trim().length === 0) {
                throw new Error('Intensidade das crises é obrigatória');
            }

            if (!frequencia_crise || frequencia_crise.trim().length === 0) {
                throw new Error('Frequência das crises é obrigatória');
            }

            // TODO: Validar se intensidade_crise é um valor válido do enum IntensidadeCrise
            // TODO: Buscar utente na BD para verificar se existe
            
            const novaAlergia: AlergiaResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                anamnese_id: 0, // TODO: Buscar anamneseId do utente
                descricao,
                frequencia_crise,
                intensidade_crise: intensidade_crise as any // TODO: Type cast apropriado
            };

            // Registar auditoria
             await this.auditoriaService.registarAuditoria(
                 utilizadorIdLogado,
                 'alergia',
                 novaAlergia.id,
                 OperacaoAuditoria.CRIACAO,
                 null,
                 JSON.stringify(novaAlergia)
             );

            return novaAlergia;
        } catch (error) {
            console.error('Erro ao registar alergia:', error);
            throw error;
        }
    }

    /**
     * Obter alergia por ID
     */
    async obter(alergiaId: number): Promise<AlergiaResponseDto> {
        try {
            // TODO: Buscar na base de dados
            const alergia: AlergiaResponseDto = {
                id: alergiaId,
                anamnese_id: 0,
                descricao: '',
                frequencia_crise: '',
                intensidade_crise: '' as any
            };
            return alergia;
        } catch (error) {
            console.error('Erro ao obter alergia:', error);
            throw error;
        }
    }

    /**
     * RF035: Listar alergias de um utente
     * RF036: Permitir ao Medico consultar dados de alergias
     * Listar todas as alergias de um utente
     */
    async listarAlergias(utenteId: number): Promise<AlergiaResponseDto[]> {
        try {
            // TODO: Validar se utente existe
            // TODO: Buscar na base de dados todas as alergias do utente
            const alergias: AlergiaResponseDto[] = [];
            return alergias;
        } catch (error) {
            console.error('Erro ao listar alergias:', error);
            throw error;
        }
    }

    /**
     * Atualizar alergia
     */
    async atualizar(
        alergiaId: number,
        alergiaData: CreateAlergiaDto,
        utilizadorIdLogado: number
    ): Promise<AlergiaResponseDto> {
        try {
            // Validações
            if (!alergiaData.descricao || alergiaData.descricao.trim().length === 0) {
                throw new Error('Descrição da alergia é obrigatória');
            }

            if (!alergiaData.frequencia_crise || alergiaData.frequencia_crise.trim().length === 0) {
                throw new Error('Frequência das crises é obrigatória');
            }

            // TODO: Buscar versão anterior para auditoria
            const alergiaAnterior = await this.obter(alergiaId);

            // TODO: Atualizar na base de dados
            const alergiaAtualizada: AlergiaResponseDto = {
                id: alergiaId,
                anamnese_id: alergiaData.anamnese_id,
                descricao: alergiaData.descricao,
                frequencia_crise: alergiaData.frequencia_crise,
                intensidade_crise: alergiaData.intensidade_crise
            };

            // Registar auditoria
             await this.auditoriaService.registarAuditoria(
                 utilizadorIdLogado,
                 'alergia',
                 alergiaId,
                 OperacaoAuditoria.ALTERACAO,
                 JSON.stringify(alergiaAnterior),
                 JSON.stringify(alergiaAtualizada)
             );

            return alergiaAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar alergia:', error);
            throw error;
        }
    }

    /**
     * Apagar alergia
     */
    async apagar(
        alergiaId: number,
        utilizadorIdLogado: number
    ): Promise<void> {
        try {
            const alergiaAnterior = await this.obter(alergiaId);
            const alergiaEliminada = { ...alergiaAnterior, deleted_at: new Date() };
            // TODO: UPDATE alergia SET deleted_at = NOW() WHERE id = alergiaId
            await this.auditoriaService.registarAuditoria(
                utilizadorIdLogado,
                'alergia',
                alergiaId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(alergiaAnterior),
                JSON.stringify(alergiaEliminada)
            );
        } catch (error) {
            console.error('Erro ao apagar alergia:', error);
            throw error;
        }
    }

    /**
     * Listar alergias de um utente com filtros avançados
     * Útil para o dashboard e consultas clínicas
     */
    async listarAlergiasPorUtente(
        utenteId: number,
        filtros?: {
            intensidade?: string;
            frequencia?: string;
        }
    ): Promise<AlergiaResponseDto[]> {
        try {
            // TODO: Implementar filtros na query
            let alergias = await this.listarAlergias(utenteId);

            // Aplicar filtros se fornecidos
            if (filtros) {
                if (filtros.intensidade) {
                    alergias = alergias.filter(a => a.intensidade_crise === filtros.intensidade);
                }
                if (filtros.frequencia) {
                    alergias = alergias.filter(a => a.frequencia_crise === filtros.frequencia);
                }
            }

            return alergias;
        } catch (error) {
            console.error('Erro ao listar alergias com filtros:', error);
            throw error;
        }
    }

    /**
     * Verificar se utente tem alguma alergia específica
     * Útil para validações e alertas
     */
    async temAlergia(
        utenteId: number,
        descricaoAlergia: string
    ): Promise<boolean> {
        try {
            const alergias = await this.listarAlergias(utenteId);
            return alergias.some(a => 
                a.descricao.toLowerCase().includes(descricaoAlergia.toLowerCase())
            );
        } catch (error) {
            console.error('Erro ao verificar alergia:', error);
            throw error;
        }
    }

    /**
     * Contar total de alergias de um utente
     */
    async contarAlergias(utenteId: number): Promise<number> {
        try {
            const alergias = await this.listarAlergias(utenteId);
            return alergias.length;
        } catch (error) {
            console.error('Erro ao contar alergias:', error);
            throw error;
        }
    }

    /**
     * Obter resumo de alergias para dashboard
     * Retorna informação agregada sobre alergias do utente
     */
    async obterResumoAlergias(utenteId: number): Promise<any> {
        try {
            const alergias = await this.listarAlergias(utenteId);
            
            return {
                totalAlergias: alergias.length,
                alergiasPorIntensidade: {
                    leve: alergias.filter(a => a.intensidade_crise === 'LEVE').length,
                    moderada: alergias.filter(a => a.intensidade_crise === 'MODERADA').length,
                    grave: alergias.filter(a => a.intensidade_crise === 'GRAVE').length
                },
                alergiasPorFrequencia: {
                    nunca: alergias.filter(a => a.frequencia_crise === 'Nunca').length,
                    ateumoU2: alergias.filter(a => a.frequencia_crise === 'Até 1 ou 2 dias').length,
                    maisDois: alergias.filter(a => a.frequencia_crise === 'Mais de 2 dias por semana').length,
                    quaseTodos: alergias.filter(a => a.frequencia_crise === 'Quase todos os dias').length
                },
                alergias
            };
        } catch (error) {
            console.error('Erro ao obter resumo de alergias:', error);
            throw error;
        }
    }
}
