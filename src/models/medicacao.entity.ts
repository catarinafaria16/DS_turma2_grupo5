export class Medicacao {
    id: number;
    prescricao_id: number;
    nome: string;
    dose: string;
    duracao: string;
    periodicidade: string;
    validade: Date;

    constructor(
        id: number,
        prescricao_id: number,
        nome: string,
        dose: string,
        duracao: string,
        periodicidade: string,
        validade: Date
    ) {
        this.id = id;
        this.prescricao_id = prescricao_id;
        this.nome = nome;
        this.dose = dose;
        this.duracao = duracao;
        this.periodicidade = periodicidade;
        this.validade = validade;
    }
}
