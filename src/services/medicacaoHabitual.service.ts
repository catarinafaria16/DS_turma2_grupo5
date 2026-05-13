import type { CreateMedicacaoHabitualDto } from '../dtos/medicacaoHabitual/create-medicacaoHabitual.dto';
import type { MedicacaoHabitualResponseDto } from '../dtos/medicacaoHabitual/medicacaoHabitual-response.dto';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum';

export class MedicacaoHabitualService {
    private auditoriaService: any; // TODO: Implementar AuditoriaService

    constructor() {
        this.auditoriaService = new AuditoriaService();
    }

    async criar(
        medicacaoData: CreateMedicacaoHabitualDto,
        utilizadorIdLogado: number
    ): Promise<MedicacaoHabitualResponseDto> {
        try {
            if (medicacaoData.anamnese_id <= 0) {
                throw new Error('ID de anamnese deve ser válido');
            }
            if (!medicacaoData.nome || medicacaoData.nome.trim().length === 0) {
                throw new Error('Nome da medicação habitual é obrigatório');
            }

            const novaMedicacao: MedicacaoHabitualResponseDto = {
                id: Math.random(), // TODO: Será gerado pela BD
                ...medicacaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medicacao_habitual',
                novaMedicacao.id,
                OperacaoAuditoria.CRIACAO,
                null,
                JSON.stringify(novaMedicacao)
            );

            return novaMedicacao;
        } catch (error) {
            console.error('Erro ao criar medicação habitual:', error);
            throw error;
        }
    }

    async obter(medicacaoHabitualId: number): Promise<MedicacaoHabitualResponseDto> {
        try {
            if (medicacaoHabitualId <= 0) {
                throw new Error('ID de medicação habitual inválido');
            }

            const medicacaoHabitual: MedicacaoHabitualResponseDto = {
                id: medicacaoHabitualId,
                anamnese_id: 0,
                nome: '',
                dose: '',
                duracao: '',
                periodicidade: ''
            };

            return medicacaoHabitual;
        } catch (error) {
            console.error('Erro ao obter medicação habitual:', error);
            throw error;
        }
    }

    async listar(): Promise<MedicacaoHabitualResponseDto[]> {
        try {
            // TODO: Buscar todas as medicações habituais na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar medicações habituais:', error);
            throw error;
        }
    }

    async listarPorAnamnese(anamneseId: number): Promise<MedicacaoHabitualResponseDto[]> {
        try {
            if (anamneseId <= 0) {
                throw new Error('ID de anamnese inválido');
            }

            // TODO: Buscar medicações habituais por anamnese na base de dados
            return [];
        } catch (error) {
            console.error('Erro ao listar medicações habituais por anamnese:', error);
            throw error;
        }
    }

    async atualizar(
        medicacaoHabitualId: number,
        medicacaoData: CreateMedicacaoHabitualDto,
        utilizadorIdLogado: number
    ): Promise<MedicacaoHabitualResponseDto> {
        try {
            const medicacaoAnterior = await this.obter(medicacaoHabitualId);

            const medicacaoAtualizada: MedicacaoHabitualResponseDto = {
                ...medicacaoAnterior,
                ...medicacaoData
            };

            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medicacao_habitual',
                medicacaoHabitualId,
                OperacaoAuditoria.ALTERACAO,
                JSON.stringify(medicacaoAnterior),
                JSON.stringify(medicacaoAtualizada)
            );

            return medicacaoAtualizada;
        } catch (error) {
            console.error('Erro ao atualizar medicação habitual:', error);
            throw error;
        }
    }

    async apagar(medicacaoHabitualId: number, utilizadorIdLogado: number): Promise<void> {
        try {
            const medicacaoAnterior = await this.obter(medicacaoHabitualId);

            // TODO: Apagar da base de dados ou usar soft delete
            await this.auditoriaService?.registarAuditoria(
                utilizadorIdLogado,
                'medicacao_habitual',
                medicacaoHabitualId,
                OperacaoAuditoria.ELIMINACAO,
                JSON.stringify(medicacaoAnterior),
                null
            );
        } catch (error) {
            console.error('Erro ao apagar medicação habitual:', error);
            throw error;
        }
    }
}
