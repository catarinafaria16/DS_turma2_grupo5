import { RespostaCarat1a9 } from '../enums/RespostaCarat1a9.enum.js';
import { RespostaCarat10 } from '../enums/RespostaCarat10.enum.js';

export class RespostaCarat {
    id: number;
    avaliacao_id: number;
    utente_id: number;
    data_avaliacao: Date;
    r1: RespostaCarat1a9;
    r2: RespostaCarat1a9;
    r3: RespostaCarat1a9;
    r4: RespostaCarat1a9;
    r5: RespostaCarat1a9;
    r6: RespostaCarat1a9;
    r7: RespostaCarat1a9;
    r8: RespostaCarat1a9;
    r9: RespostaCarat1a9;
    r10: RespostaCarat10;
    score_total: number;
    interpretacao: string;
    recomendacao_automatica: string;

    constructor(
        id: number,
        avaliacao_id: number,
        utente_id: number,
        data_avaliacao: Date,
        r1: RespostaCarat1a9,
        r2: RespostaCarat1a9,
        r3: RespostaCarat1a9,
        r4: RespostaCarat1a9,
        r5: RespostaCarat1a9,
        r6: RespostaCarat1a9,
        r7: RespostaCarat1a9,
        r8: RespostaCarat1a9,
        r9: RespostaCarat1a9,
        r10: RespostaCarat10,
        score_total: number,
        interpretacao: string,
        recomendacao_automatica: string
    ) {
        this.id = id;
        this.avaliacao_id = avaliacao_id;
        this.utente_id = utente_id;
        this.data_avaliacao = data_avaliacao;
        this.r1 = r1;
        this.r2 = r2;
        this.r3 = r3;
        this.r4 = r4;
        this.r5 = r5;
        this.r6 = r6;
        this.r7 = r7;
        this.r8 = r8;
        this.r9 = r9;
        this.r10 = r10;
        this.score_total = score_total;
        this.interpretacao = interpretacao;
        this.recomendacao_automatica = recomendacao_automatica;
    }
}
