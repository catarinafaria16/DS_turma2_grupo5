import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum';

export class PlanoAcompanhamento {
    id: number;
    medico_id: number;
    utente_id: number;
    frequencia_avaliacao: string;
    data_inicio: Date;
    data_fim: Date;
    estado: EstadoPlanoAcompanhamento;
    recomendacao_medica: string;

    constructor(
        id: number,
        medico_id: number,
        utente_id: number,
        frequencia_avaliacao: string,
        data_inicio: Date,
        data_fim: Date,
        estado: EstadoPlanoAcompanhamento,
        recomendacao_medica: string
    ) {
        this.id = id;
        this.medico_id = medico_id;
        this.utente_id = utente_id;
        this.frequencia_avaliacao = frequencia_avaliacao;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.estado = estado;
        this.recomendacao_medica = recomendacao_medica;
    }
}
