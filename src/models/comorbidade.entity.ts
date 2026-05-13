export class Comorbidade {
    id: number;
    anamnese_id: number;
    descricao: string;

    constructor(id: number, anamnese_id: number, descricao: string) {
        this.id = id;
        this.anamnese_id = anamnese_id;
        this.descricao = descricao;
    }
}
