import { EstadoPlanoAcompanhamento } from '../../enums/EstadoPlanoAcompanhamento.enum.js';

export interface PlanoAcompanhamentoResponseDto {
    id: number;
    medico_id: number;
    utente_id: number;
    frequencia_avaliacao: string;
    data_inicio: Date;
    data_fim: Date;
    estado: EstadoPlanoAcompanhamento;
    recomendacao_medica: string;
}