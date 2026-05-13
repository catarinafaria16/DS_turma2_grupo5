export class MedicacaoHabitual {
    id: number;
    anamnese_id: number;
    nome: string;
    dose: string;
    duracao: string;
    periodicidade: string;

    constructor(
        id: number,
        anamnese_id: number,
        nome: string,
        dose: string,
        duracao: string,
        periodicidade: string
    ) {
        this.id = id;
        this.anamnese_id = anamnese_id;
        this.nome = nome;
        this.dose = dose;
        this.duracao = duracao;
        this.periodicidade = periodicidade;
    }
}
