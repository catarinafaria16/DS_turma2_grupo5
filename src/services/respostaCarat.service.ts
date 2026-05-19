import type { CreateRespostaCaratDto } from '../dtos/respostaCarat/create-respostaCarat.dto.js';
import type { RespostaCaratResponseDto } from '../dtos/respostaCarat/respostaCarat-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

export class RespostaCaratService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    // RF013: Validar que todas as questões foram respondidas
    private todasPerguntasRespondidas(data: CreateRespostaCaratDto): boolean {
        const r = data as unknown as Record<string, unknown>;
        return ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10']
            .every(campo => r[campo] !== undefined && r[campo] !== null);
    }

    // RF009: Score total 0-30 (soma das 10 respostas)
    private calcularScore(data: CreateRespostaCaratDto): number {
        return (
            Number(data.r1) + Number(data.r2) + Number(data.r3) +
            Number(data.r4) + Number(data.r5) + Number(data.r6) +
            Number(data.r7) + Number(data.r8) + Number(data.r9) +
            Number(data.r10)
        );
    }

    // RF010: Classificação do nível de controlo da doença
    private interpretarScore(score: number): string {
        if (score >= 21) return 'Doença bem controlada';
        if (score >= 16) return 'Doença parcialmente controlada';
        return 'Doença mal controlada';
    }

    // RF011: Recomendações com base no score (autocuidado, sinais de alarme, próxima avaliação)
    private gerarRecomendacao(score: number): string {
        if (score >= 21) {
            return (
                'A sua asma e rinite estão bem controladas. ' +
                'Continue o tratamento atual e mantenha a adesão à medicação. ' +
                'Sinais de alarme: agravamento súbito dos sintomas ou crises noturnas. ' +
                'Próxima avaliação recomendada: 3 a 6 meses.'
            );
        }
        if (score >= 16) {
            return (
                'A sua doença está parcialmente controlada. ' +
                'Reveja a adesão à medicação e consulte o seu médico para possível ajuste do tratamento. ' +
                'Sinais de alarme: crises noturnas frequentes ou necessidade crescente de broncodilatadores de resgate. ' +
                'Próxima avaliação recomendada: 1 a 2 meses.'
            );
        }
        return (
            'A sua doença está mal controlada. ' +
            'Consulte o seu médico com urgência para revisão do tratamento. ' +
            'Sinais de alarme: dificuldade respiratória, crises frequentes ou limitação significativa das atividades diárias. ' +
            'Próxima avaliação recomendada: o mais brevemente possível.'
        );
    }

    // RF022: Avaliar regras de alerta após nova avaliação CARAT
    private async avaliarRegrasAlerta(resposta: RespostaCaratResponseDto): Promise<void> {
        // TODO: buscar regras ativas do médico do utente na BD
        // TODO: gerar alerta se resposta.score_total < limiar_score da regra (RF015)
        // TODO: comparar com avaliação anterior e gerar alerta se deterioração > valor_deterioracao (RF016)
        // TODO: invocar AlertaService.criar() para cada regra violada
        console.log(
            `[CARAT] Score ${resposta.score_total} registado para utente ${resposta.utente_id} — verificando regras de alerta`
        );
    }

    async criar(
        respostaData: CreateRespostaCaratDto,
        utilizadorIdLogado: number
    ): Promise<RespostaCaratResponseDto> {
        try {
            if (respostaData.avaliacao_id <= 0 || respostaData.utente_id <= 0) {
                throw new Error('IDs de avaliação e utente devem ser válidos');
            }

            // RF013: Validar que todas as questões foram respondidas
            if (!this.todasPerguntasRespondidas(respostaData)) {
                throw new Error('Todas as questões do questionário CARAT são obrigatórias');
            }

            // RF009-RF011: Calcular score, interpretação e recomendação automática
            const score_total = this.calcularScore(respostaData);
            const interpretacao = this.interpretarScore(score_total);
            const recomendacao_automatica = this.gerarRecomendacao(score_total);

            const novaResposta: RespostaCaratResponseDto = {
                id: Math.random(),
                ...respostaData,
                score_total,
                interpretacao,
                recomendacao_automatica
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'resposta_carat',
                novaResposta.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaResposta)
            );

            // RF022: Avaliar regras de alerta automaticamente após nova avaliação
            await this.avaliarRegrasAlerta(novaResposta);

            return novaResposta;
        } catch (error) {
            console.error('Erro ao criar resposta CARAT:', error);
            throw error;
        }
    }

    async obter(respostaId: number): Promise<RespostaCaratResponseDto> {
        try {
            if (respostaId <= 0) {
                throw new Error('ID de resposta inválido');
            }

            const resposta: RespostaCaratResponseDto = {
                id: respostaId,
                avaliacao_id: 0,
                utente_id: 0,
                data_avaliacao: new Date(),
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0,
                r5: 0,
                r6: 0,
                r7: 0,
                r8: 0,
                r9: 0,
                r10: 0,
                score_total: 0,
                interpretacao: '',
                recomendacao_automatica: ''
            };

            return resposta;
        } catch (error) {
            console.error('Erro ao obter resposta CARAT:', error);
            throw error;
        }
    }

    async listar(): Promise<RespostaCaratResponseDto[]> {
        try {
            return [];
        } catch (error) {
            console.error('Erro ao listar respostas CARAT:', error);
            throw error;
        }
    }

    async listarPorAvaliacao(avaliacaoId: number): Promise<RespostaCaratResponseDto[]> {
        try {
            if (avaliacaoId <= 0) {
                throw new Error('ID de avaliação inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar respostas por avaliação:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number): Promise<RespostaCaratResponseDto[]> {
        try {
            if (utenteId <= 0) {
                throw new Error('ID do utente inválido');
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar respostas por utente:', error);
            throw error;
        }
    }

    async atualizar(
        respostaId: number,
        respostaData: CreateRespostaCaratDto,
        utilizadorIdLogado: number
    ): Promise<RespostaCaratResponseDto> {
        try {
            // RF013: Validar que todas as questões estão presentes na atualização
            if (!this.todasPerguntasRespondidas(respostaData)) {
                throw new Error('Todas as questões do questionário CARAT são obrigatórias');
            }

            const respostaAnterior = await this.obter(respostaId);

            // RF009-RF011: Recalcular score após atualização
            const score_total = this.calcularScore(respostaData);
            const interpretacao = this.interpretarScore(score_total);
            const recomendacao_automatica = this.gerarRecomendacao(score_total);

            const respostaAtualizada: RespostaCaratResponseDto = {
                ...respostaAnterior,
                ...respostaData,
                score_total,
                interpretacao,
                recomendacao_automatica
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'resposta_carat',
                respostaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(respostaAnterior),
                JSON.stringify(respostaAtualizada)
            );

            return respostaAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar resposta CARAT:', error);
            throw error;
        }
    }

    async apagar(respostaId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const respostaAnterior = await this.obter(respostaId);
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'resposta_carat',
                respostaId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(respostaAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar resposta CARAT:', error);
            throw error;
        }
    }
}
