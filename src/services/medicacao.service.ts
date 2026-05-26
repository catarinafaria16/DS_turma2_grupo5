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
    private static readonly catalogoMedicamentos: Record<string, { minMg: number; maxMg: number; unidades: string[] }> = {
        // Analgésicos / Anti-inflamatórios
        paracetamol: { minMg: 125, maxMg: 1000, unidades: ['mg', 'g'] },
        ibuprofeno: { minMg: 100, maxMg: 800, unidades: ['mg'] },
        // Corticosteroides sistémicos
        prednisolona: { minMg: 5, maxMg: 60, unidades: ['mg'] },
        metilprednisolona: { minMg: 4, maxMg: 64, unidades: ['mg'] },
        dexametasona: { minMg: 0.5, maxMg: 20, unidades: ['mg'] },
        // Corticosteroides inalados (ICS)
        budesonida: { minMg: 0.05, maxMg: 1.6, unidades: ['mg', 'mcg'] },
        beclometasona: { minMg: 0.05, maxMg: 1.5, unidades: ['mg', 'mcg'] },
        fluticasona: { minMg: 0.05, maxMg: 1, unidades: ['mg', 'mcg'] },
        ciclesonida: { minMg: 0.08, maxMg: 0.64, unidades: ['mg', 'mcg'] },
        mometasona: { minMg: 0.1, maxMg: 0.8, unidades: ['mg', 'mcg'] },
        // LABA
        formoterol: { minMg: 0.0045, maxMg: 0.024, unidades: ['mg', 'mcg'] },
        salmeterol: { minMg: 0.025, maxMg: 0.05, unidades: ['mg', 'mcg'] },
        indacaterol: { minMg: 0.075, maxMg: 0.3, unidades: ['mg', 'mcg'] },
        // LAMA
        tiotropio: { minMg: 0.0025, maxMg: 0.018, unidades: ['mg', 'mcg'] },
        umeclidinio: { minMg: 0.0625, maxMg: 0.125, unidades: ['mg', 'mcg'] },
        // SAMA
        ipratropio: { minMg: 0.02, maxMg: 2, unidades: ['mg', 'mcg'] },
        // SABA
        salbutamol: { minMg: 0.05, maxMg: 8, unidades: ['mg', 'mcg'] },
        terbutalina: { minMg: 0.25, maxMg: 10, unidades: ['mg', 'mcg'] },
        // Anti-leucotrienos
        montelucaste: { minMg: 4, maxMg: 10, unidades: ['mg'] },
        // Anti-histamínicos
        cetirizina: { minMg: 5, maxMg: 20, unidades: ['mg'] },
        loratadina: { minMg: 5, maxMg: 10, unidades: ['mg'] },
        desloratadina: { minMg: 2.5, maxMg: 5, unidades: ['mg'] },
        rupatadina: { minMg: 10, maxMg: 20, unidades: ['mg'] },
        bilastina: { minMg: 20, maxMg: 40, unidades: ['mg'] },
        levocetirizina: { minMg: 2.5, maxMg: 10, unidades: ['mg'] },
        fexofenadina: { minMg: 60, maxMg: 180, unidades: ['mg'] },
        ebastina: { minMg: 10, maxMg: 20, unidades: ['mg'] },
        // Biológicos
        omalizumab: { minMg: 75, maxMg: 600, unidades: ['mg'] },
        mepolizumab: { minMg: 100, maxMg: 100, unidades: ['mg'] },
        benralizumab: { minMg: 30, maxMg: 30, unidades: ['mg'] },
        dupilumab: { minMg: 200, maxMg: 300, unidades: ['mg'] },
        // Mucolíticos
        acetilcisteina: { minMg: 100, maxMg: 600, unidades: ['mg'] },
        ambroxol: { minMg: 15, maxMg: 90, unidades: ['mg'] },
        // Xantinas
        teofilina: { minMg: 100, maxMg: 600, unidades: ['mg'] },
        // Antibióticos
        amoxicilina: { minMg: 250, maxMg: 1000, unidades: ['mg', 'g'] },
        azitromicina: { minMg: 250, maxMg: 500, unidades: ['mg'] },
        claritromicina: { minMg: 250, maxMg: 500, unidades: ['mg'] },
        levofloxacina: { minMg: 250, maxMg: 750, unidades: ['mg'] },
        doxiciclina: { minMg: 50, maxMg: 200, unidades: ['mg'] },
        // Outros
        omeprazol: { minMg: 10, maxMg: 40, unidades: ['mg'] },
        amlodipina: { minMg: 2.5, maxMg: 10, unidades: ['mg'] },
        losartan: { minMg: 25, maxMg: 100, unidades: ['mg'] },
        metformina: { minMg: 500, maxMg: 1000, unidades: ['mg', 'g'] },
    };

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

        if (utilizador.perfil === PerfilUtilizador.UTENTE) {
            if (utente.utilizador_id !== utilizador.id) {
                throw new Error('Acesso negado: nao pode consultar medicacao de outro utente');
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

    private normalizarNomeMedicamento(nome: string): string {
        return nome
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    private converterDoseParaMg(valor: number, unidade: string): number {
        if (unidade === 'g') return valor * 1000;
        if (unidade === 'mcg') return valor / 1000;
        return valor;
    }

    private validarMedicacao(medicacaoData: CreateMedicacaoDto): void {
        if (!medicacaoData.nome || medicacaoData.nome.trim().length === 0) {
            throw new Error('Nome da medicacao e obrigatorio');
        }
        if (!medicacaoData.dose || medicacaoData.dose.trim().length === 0) {
            throw new Error('Dose da medicacao e obrigatoria');
        }
        if (!medicacaoData.duracao || medicacaoData.duracao.trim().length === 0) {
            throw new Error('Duracao da medicacao e obrigatoria');
        }
        if (!medicacaoData.periodicidade || medicacaoData.periodicidade.trim().length === 0) {
            throw new Error('Periodicidade da medicacao e obrigatoria');
        }

        const doseNormalizada = medicacaoData.dose.trim().toLowerCase().replace(',', '.');
        const doseMatch = doseNormalizada.match(/^(\d+(?:\.\d+)?)\s*(mg|g|mcg)$/);
        if (!doseMatch) {
            throw new Error('Dose invalida: use um formato como 500 mg, 1 g ou 200 mcg');
        }

        const valor = Number(doseMatch[1]);
        const unidade = doseMatch[2]!;
        if (!Number.isFinite(valor) || valor <= 0) {
            throw new Error('Dose invalida: o valor deve ser numerico e maior que zero');
        }

        const nomeNormalizado = this.normalizarNomeMedicamento(medicacaoData.nome);
        const medicamento = MedicacaoService.catalogoMedicamentos[nomeNormalizado];
        if (medicamento) {
            if (!medicamento.unidades.includes(unidade)) {
                throw new Error(`Dose invalida para ${medicacaoData.nome}: unidade nao suportada`);
            }
            const doseMg = this.converterDoseParaMg(valor, unidade);
            if (doseMg < medicamento.minMg || doseMg > medicamento.maxMg) {
                throw new Error(`Dose clinicamente implausivel para ${medicacaoData.nome}`);
            }
        }

        const validade = new Date(medicacaoData.validade);
        if (Number.isNaN(validade.getTime())) {
            throw new Error('Validade da medicacao invalida');
        }
        if (validade < new Date(new Date().toDateString())) {
            throw new Error('Validade da medicacao deve ser atual ou futura');
        }
    }

    async criar(medicacaoData: CreateMedicacaoDto, utilizador: UtilizadorAutenticado): Promise<MedicacaoResponseDto> {
        try {
            this.validarMedicacao(medicacaoData);

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

            let prescricoes: Prescricao[] = [];
            if (utilizador.perfil === PerfilUtilizador.MEDICO) {
                prescricoes = await this.prescricaoRepo.find({ where: { medico_id: utilizador.id } });
            } else {
                const utente = await this.utenteRepo.findOne({ where: { utilizador_id: utilizador.id } });
                if (!utente) {
                    return [];
                }
                prescricoes = await this.prescricaoRepo.find({ where: { utente_id: utente.id } });
            }

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
            this.validarMedicacao(medicacaoData);

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
