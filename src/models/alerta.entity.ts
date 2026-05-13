import { TipoAlerta } from '../enums/TipoAlerta.enum';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum';

export class Alerta {
    id: number;
    utente_id: number;
    medico_id: number;
    regra_id: number;
    tipo: TipoAlerta;
    estado: EstadoAlerta;
    data_criacao: Date;
    data_atualizacao_estado: Date;

    constructor(
        id: number,
        utente_id: number,
        medico_id: number,
        regra_id: number,
        tipo: TipoAlerta,
        estado: EstadoAlerta,
        data_criacao: Date,
        data_atualizacao_estado: Date
    ) {
        this.id = id;
        this.utente_id = utente_id;
        this.medico_id = medico_id;
        this.regra_id = regra_id;
        this.tipo = tipo;
        this.estado = estado;
        this.data_criacao = data_criacao;
        this.data_atualizacao_estado = data_atualizacao_estado;
    }
}
