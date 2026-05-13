import { CategoriaRegraAlerta } from '../enums/CategoriaRegraAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';

export class RegraAlerta {
    id: number;
    medico_id: number;
    administrador_id: number;
    categoria: CategoriaRegraAlerta;
    limiar_score: number;
    valor_deterioracao: number;
    prioridade: PrioridadeRegraAlerta;
    data_criacao: Date;

    constructor(
        id: number,
        medico_id: number,
        administrador_id: number,
        categoria: CategoriaRegraAlerta,
        limiar_score: number,
        valor_deterioracao: number,
        prioridade: PrioridadeRegraAlerta,
        data_criacao: Date
    ) {
        this.id = id;
        this.medico_id = medico_id;
        this.administrador_id = administrador_id;
        this.categoria = categoria;
        this.limiar_score = limiar_score;
        this.valor_deterioracao = valor_deterioracao;
        this.prioridade = prioridade;
        this.data_criacao = data_criacao;
    }
}
