import { AppDataSource } from '../database/data-source.js';
import { RespostaCarat } from '../models/respostaCarat.entity.js';
import { Utente } from '../models/utente.entity.js';
import { RegraAlerta } from '../models/regraAlerta.entity.js';
import { Alerta } from '../models/alerta.entity.js';
import type { CreateRespostaCaratDto } from '../dtos/respostaCarat/create-respostaCarat.dto.js';
import type { RespostaCaratResponseDto } from '../dtos/respostaCarat/respostaCarat-response.dto.js';
import { AuditoriaService } from './auditoria.service.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';
import { CategoriaRegraAlerta } from '../enums/CategoriaRegraAlerta.enum.js';
import { TipoAlerta } from '../enums/TipoAlerta.enum.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export class RespostaCaratService {
    private auditoriaService: AuditoriaService;

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    private get repo() { return AppDataSource.getRepository(RespostaCarat); }
    private get utenteRepo() { return AppDataSource.getRepository(Utente); }
    private get regraAlertaRepo() { return AppDataSource.getRepository(RegraAlerta); }
    private get alertaRepo() { return AppDataSource.getRepository(Alerta); }

    private async validarAcessoUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<Utente> {
        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });
        if (!utente) throw new Error('Utente nao encontrado');

        if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) return utente;
        if (utilizador.perfil === PerfilUtilizador.MEDICO) {
            if (utente.medico_id !== utilizador.id) {
                throw new Error('Acesso negado: este utente nao pertence ao medico autenticado');
            }
            return utente;
        }
        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar respostas CARAT de outro utente');
            }
            return utente;
        }

        throw new Error('Perfil nao reconhecido');
    }

    private async obterInterna(respostaId: number): Promise<RespostaCarat> {
        if (respostaId <= 0) throw new Error('ID de resposta invalido');
        const resposta = await this.repo.findOne({ where: { id: respostaId } });
        if (!resposta) throw new Error('Resposta CARAT nao encontrada');
        return resposta;
    }

    private todasPerguntasRespondidas(data: CreateRespostaCaratDto): boolean {
        const r = data as unknown as Record<string, unknown>;
        return ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10']
            .every((campo) => r[campo] !== undefined && r[campo] !== null);
    }

    private calcularScore(data: CreateRespostaCaratDto): number {
        // Q1-9: 0=Nunca(3pts), 1=Ate2dias(2pts), 2=Mais2dias(1pt), 3=QuaseTodos(0pts)
        // Q10:  0=NaoToma(3pts), 1=Nunca(3pts), 2=Menos7dias(2pts), 3=7ouMais(0pts)
        const s19: Record<number, number> = { 0: 3, 1: 2, 2: 1, 3: 0 };
        const s10: Record<number, number> = { 0: 3, 1: 3, 2: 2, 3: 0 };
        const total = [data.r1, data.r2, data.r3, data.r4, data.r5, data.r6, data.r7, data.r8, data.r9]
            .reduce((sum, r) => sum + (s19[Number(r)] ?? 0), 0);
        return total + (s10[Number(data.r10)] ?? 0);
    }

    private interpretarScore(score: number): string {
        if (score >= 21) return 'Doenca bem controlada';
        if (score >= 16) return 'Doenca parcialmente controlada';
        return 'Doenca mal controlada';
    }

    private async verificarECriarAlertas(utenteId: number, scoreTotal: number, respostaId: number): Promise<void> {
        const utente = await this.utenteRepo.findOne({ where: { id: utenteId } });
        if (!utente) return;

        const notaBase = `Score CARAT: ${scoreTotal}/30 — ${this.interpretarScore(scoreTotal)} (resposta #${respostaId})`;

        // Alerta automático baseado nos níveis CARAT (sem regra associada)
        if (scoreTotal < 16) {
            const alerta = this.alertaRepo.create({
                utente_id: utenteId,
                medico_id: utente.medico_id,
                tipo: TipoAlerta.SCORE_BAIXO,
                estado: EstadoAlerta.NOVO,
                prioridade: PrioridadeRegraAlerta.MUITO_ALTA,
                notas: notaBase,
                data_atualizacao_estado: new Date()
            });
            await this.alertaRepo.save(alerta);
            console.log(`[ALERTA CARAT] Score ${scoreTotal} — doença mal controlada — utente #${utenteId}`);
        } else if (scoreTotal < 21) {
            const alerta = this.alertaRepo.create({
                utente_id: utenteId,
                medico_id: utente.medico_id,
                tipo: TipoAlerta.DETERIORACAO,
                estado: EstadoAlerta.NOVO,
                prioridade: PrioridadeRegraAlerta.ALTA,
                notas: notaBase,
                data_atualizacao_estado: new Date()
            });
            await this.alertaRepo.save(alerta);
            console.log(`[ALERTA CARAT] Score ${scoreTotal} — doença parcialmente controlada — utente #${utenteId}`);
        }

        // Regras custom criadas pelo médico
        const todasRegras = await this.regraAlertaRepo.find({
            where: { medico_id: utente.medico_id, categoria: CategoriaRegraAlerta.LIMIAR_SCORE }
        });
        // Aplica regras sem utente específico (globais do médico) OU específicas deste utente
        const regrasAplicaveis = todasRegras.filter(
            r => r.utente_id === undefined || r.utente_id === null || r.utente_id === utenteId
        );

        for (const regra of regrasAplicaveis) {
            if (scoreTotal <= regra.limiar_score) {
                const tipo = scoreTotal < 16 ? TipoAlerta.SCORE_BAIXO : TipoAlerta.DETERIORACAO;
                const alerta = this.alertaRepo.create({
                    utente_id: utenteId,
                    medico_id: utente.medico_id,
                    regra_id: regra.id,
                    tipo,
                    estado: EstadoAlerta.NOVO,
                    prioridade: regra.prioridade,
                    notas: `[Regra #${regra.id}] ${notaBase}`,
                    data_atualizacao_estado: new Date()
                });
                await this.alertaRepo.save(alerta);
                console.log(`[ALERTA REGRA] Score ${scoreTotal} ≤ limiar ${regra.limiar_score} — regra #${regra.id} — utente #${utenteId}`);
            }
        }
    }

    private gerarRecomendacao(score: number): string {
        if (score >= 21) {
            return 'A doenca esta bem controlada. Continue o tratamento atual e mantenha a adesao a medicacao.';
        }
        if (score >= 16) {
            return 'A doenca esta parcialmente controlada. Reveja a adesao a medicacao e consulte o medico.';
        }
        return 'A doenca esta mal controlada. Consulte o medico com urgencia para rever o tratamento.';
    }

    async criar(respostaData: CreateRespostaCaratDto, utilizador: UtilizadorAutenticado): Promise<RespostaCaratResponseDto> {
        try {
            if (respostaData.avaliacao_id <= 0 || respostaData.utente_id <= 0) {
                throw new Error('IDs de avaliacao e utente devem ser validos');
            }
            await this.validarAcessoUtente(respostaData.utente_id, utilizador);

            if (!this.todasPerguntasRespondidas(respostaData)) {
                throw new Error('Todas as questoes do questionario CARAT sao obrigatorias');
            }

            const score_total = this.calcularScore(respostaData);
            const interpretacao = this.interpretarScore(score_total);
            const recomendacao_automatica = this.gerarRecomendacao(score_total);

            const resposta = this.repo.create({
                ...respostaData,
                data_avaliacao: new Date(),
                score_total,
                interpretacao,
                recomendacao_automatica
            });
            const saved = await this.repo.save(resposta);

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'resposta_carat',
                saved.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(saved)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            this.verificarECriarAlertas(respostaData.utente_id, score_total, saved.id)
                .catch((e) => console.error('[ALERTA] Falha ao verificar regras:', e));

            return saved as RespostaCaratResponseDto;
        } catch (error) {
            console.error('Erro ao criar resposta CARAT:', error);
            throw error;
        }
    }

    async obter(respostaId: number, utilizador: UtilizadorAutenticado): Promise<RespostaCaratResponseDto> {
        try {
            const resposta = await this.obterInterna(respostaId);
            await this.validarAcessoUtente(resposta.utente_id, utilizador);
            return resposta as RespostaCaratResponseDto;
        } catch (error) {
            console.error('Erro ao obter resposta CARAT:', error);
            throw error;
        }
    }

    async listar(utilizador: UtilizadorAutenticado): Promise<RespostaCaratResponseDto[]> {
        try {
            if (utilizador.perfil === PerfilUtilizador.ADMINISTRADOR) {
                return await this.repo.find() as RespostaCaratResponseDto[];
            }
            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                const utentes = await this.utenteRepo.find({ where: { medico_id: utilizador.id } });
                const utenteIds = utentes.map((u) => u.id);
                if (utenteIds.length === 0) return [];
                return await this.repo
                    .createQueryBuilder('resposta')
                    .where('resposta.utente_id IN (:...utenteIds)', { utenteIds })
                    .orderBy('resposta.data_avaliacao', 'DESC')
                    .getMany() as RespostaCaratResponseDto[];
            }

            const utente = await this.utenteRepo.findOne({ where: { utilizador_id: utilizador.id } });
            if (!utente) return [];
            return await this.repo.find({
                where: { utente_id: utente.id },
                order: { data_avaliacao: 'DESC' }
            }) as RespostaCaratResponseDto[];
        } catch (error) {
            console.error('Erro ao listar respostas CARAT:', error);
            throw error;
        }
    }

    async listarPorAvaliacao(avaliacaoId: number, utilizador: UtilizadorAutenticado): Promise<RespostaCaratResponseDto[]> {
        try {
            if (avaliacaoId <= 0) throw new Error('ID de avaliacao invalido');
            const respostas = await this.repo.find({ where: { avaliacao_id: avaliacaoId } });
            for (const resposta of respostas) {
                await this.validarAcessoUtente(resposta.utente_id, utilizador);
            }
            return respostas as RespostaCaratResponseDto[];
        } catch (error) {
            console.error('Erro ao listar respostas por avaliacao:', error);
            throw error;
        }
    }

    async listarPorUtente(utenteId: number, utilizador: UtilizadorAutenticado): Promise<RespostaCaratResponseDto[]> {
        try {
            if (utenteId <= 0) throw new Error('ID do utente invalido');
            await this.validarAcessoUtente(utenteId, utilizador);
            return await this.repo.find({
                where: { utente_id: utenteId },
                order: { data_avaliacao: 'DESC' }
            }) as RespostaCaratResponseDto[];
        } catch (error) {
            console.error('Erro ao listar respostas por utente:', error);
            throw error;
        }
    }

    async atualizar(
        respostaId: number,
        respostaData: CreateRespostaCaratDto,
        utilizador: UtilizadorAutenticado
    ): Promise<RespostaCaratResponseDto> {
        try {
            if (!this.todasPerguntasRespondidas(respostaData)) {
                throw new Error('Todas as questoes do questionario CARAT sao obrigatorias');
            }

            const anterior = await this.obterInterna(respostaId);
            await this.validarAcessoUtente(anterior.utente_id, utilizador);
            await this.validarAcessoUtente(respostaData.utente_id, utilizador);

            const score_total = this.calcularScore(respostaData);
            const interpretacao = this.interpretarScore(score_total);
            const recomendacao_automatica = this.gerarRecomendacao(score_total);

            const atualizada = await this.repo.save({
                ...anterior,
                ...respostaData,
                id: respostaId,
                score_total,
                interpretacao,
                recomendacao_automatica
            });

            this.auditoriaService.registarAuditoria(
                utilizador.id,
                'resposta_carat',
                respostaId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(anterior),
                JSON.stringify(atualizada)
            ).catch((e) => console.error('[AUDITORIA] Falha ao registar:', e));

            return atualizada as RespostaCaratResponseDto;
        } catch (error) {
            console.error('Erro ao atualizar resposta CARAT:', error);
            throw error;
        }
    }
}
