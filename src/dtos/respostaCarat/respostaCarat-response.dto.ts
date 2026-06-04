/*
 * RespostaCaratResponseDto — Dados de uma resposta ao questionário CARAT devolvidos pela API
 *
 * Para além das respostas originais (r1-r10), inclui os campos calculados
 * automaticamente pelo servidor:
 *   - score_total: soma ponderada de todas as respostas (0-30)
 *   - interpretacao: classificação clínica ("bem controlado", "parcialmente controlado", etc.)
 *   - recomendacao_automatica: sugestão de ação com base no score
 */
import { RespostaCarat1a9 } from '../../enums/RespostaCarat1a9.enum.js';
import { RespostaCarat10 } from '../../enums/RespostaCarat10.enum.js';

export interface RespostaCaratResponseDto {
    id: number;              // ID único deste preenchimento do questionário
    avaliacao_id: number;    // ID da versão do questionário usada
    utente_id: number;       // ID do utente que respondeu
    data_avaliacao: Date;    // Data e hora do preenchimento (definida pelo servidor)

    // Respostas às 9 primeiras perguntas
    r1: RespostaCarat1a9;  r2: RespostaCarat1a9;  r3: RespostaCarat1a9;
    r4: RespostaCarat1a9;  r5: RespostaCarat1a9;  r6: RespostaCarat1a9;
    r7: RespostaCarat1a9;  r8: RespostaCarat1a9;  r9: RespostaCarat1a9;
    r10: RespostaCarat10;  // Resposta à pergunta 10 (uso de medicamentos)

    score_total: number;          // Score calculado pelo servidor (0-30); maior = melhor controlo
    interpretacao: string;        // Ex: "Doença bem controlada" / "Doença mal controlada"
    recomendacao_automatica: string; // Ex: "Consulte o médico com urgência" / "Continue o tratamento"
}