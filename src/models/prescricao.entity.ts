import { TipoPrescricao } from '../enums/TipoPrescricao.enum';
import { EstadoPrescricao } from '../enums/EstadoPrescricao.enum';

export class Prescricao {
    id: number;
    medico_id: number;
    utente_id: number;
    tipo: TipoPrescricao;
    data_emissao: Date;
    data_validade: Date;
    estado: EstadoPrescricao;
    assinatura: string;

    constructor(
        id: number,
        medico_id: number,
        utente_id: number,
        tipo: TipoPrescricao,
        data_emissao: Date,
        data_validade: Date,
        estado: EstadoPrescricao,
        assinatura: string
    ) {
        this.id = id;
        this.medico_id = medico_id;
        this.utente_id = utente_id;
        this.tipo = tipo;
        this.data_emissao = data_emissao;
        this.data_validade = data_validade;
        this.estado = estado;
        this.assinatura = assinatura;
    }
}
