import { IntensidadeSintoma } from '../enums/IntensidadeSintoma.enum';

export class Sintoma {
    id: number;
    utente_id: number;
    descricao: string;
    intensidade: IntensidadeSintoma;
    duracao: string;
    data_registo: Date;

    constructor(
        id: number,
        utente_id: number,
        descricao: string,
        intensidade: IntensidadeSintoma,
        duracao: string,
        data_registo: Date
    ) {
        this.id = id;
        this.utente_id = utente_id;
        this.descricao = descricao;
        this.intensidade = intensidade;
        this.duracao = duracao;
        this.data_registo = data_registo;
    }
}
