import { EstadoExame } from '../enums/EstadoExame.enum.js';

export class Exame {
    id: number;
    prescricao_id: number;
    tipo_exame: string;
    data: Date;
    resultado: object;
    consentimento: boolean;
    estado: EstadoExame;

    constructor(
        id: number,
        prescricao_id: number,
        tipo_exame: string,
        data: Date,
        resultado: object,
        consentimento: boolean,
        estado: EstadoExame
    ) {
        this.id = id;
        this.prescricao_id = prescricao_id;
        this.tipo_exame = tipo_exame;
        this.data = data;
        this.resultado = resultado;
        this.consentimento = consentimento;
        this.estado = estado;
    }
}
