import { RespostaCarat1a9 } from '../../enums/RespostaCarat1a9.enum.js';
import { RespostaCarat10 } from '../../enums/RespostaCarat10.enum.js';

export interface RespostaCaratResponseDto {
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
}