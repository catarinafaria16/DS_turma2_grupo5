import { IntensidadeCriseAlergia } from '../enums/IntensidadeCriseAlergia.enum.js';

export class Alergia {
    id: number;
    anamnese_id: number;
    descricao: string;
    frequencia_crise: string;
    intensidade_crise: IntensidadeCriseAlergia;

    constructor(
        id: number,
        anamnese_id: number,
        descricao: string,
        frequencia_crise: string,
        intensidade_crise: IntensidadeCriseAlergia
    ) {
        this.id = id;
        this.anamnese_id = anamnese_id;
        this.descricao = descricao;
        this.frequencia_crise = frequencia_crise;
        this.intensidade_crise = intensidade_crise;
    }
}
