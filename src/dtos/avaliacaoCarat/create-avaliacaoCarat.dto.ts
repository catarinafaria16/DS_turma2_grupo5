/*
 * CreateAvaliacaoCaratDto — Dados necessários para criar um modelo de questionário CARAT
 *
 * Este DTO define os campos para criar uma nova VERSÃO do questionário CARAT
 * (as perguntas e opções de resposta). Normalmente só existe a versão 1.
 *
 * Os campos q1-q10 são os textos das perguntas.
 * Os campos r1-r10 são objetos JSON com as opções de resposta.
 * Ex: r1 = { "0": "Nunca", "1": "Até 2 dias por semana", ... }
 */

// Tipo auxiliar para representar qualquer valor JSON válido
type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

// Tipo para representar um objeto JSON (dicionário de chave-valor)
export type JsonObject = { [key: string]: JsonValue };

export interface CreateAvaliacaoCaratDto {
    data_criacao: Date;  // Data de criação desta versão do questionário

    // Textos das 10 perguntas do questionário
    q1: string;   // "Nariz entupido?"
    q2: string;   // "Espirros?"
    q3: string;   // "Comichão no nariz?"
    q4: string;   // "Corrimento/pingo do nariz?"
    q5: string;   // "Falta de ar/dispneia?"
    q6: string;   // "Chiadeira no peito/pieira?"
    q7: string;   // "Aperto no peito com esforço físico?"
    q8: string;   // "Cansaço/dificuldade nas atividades?"
    q9: string;   // "Acordou de noite por causa das doenças?"
    q10: string;  // "Aumentou o uso de medicamentos?"

    // Opções de resposta para cada pergunta (formato: { "0": "Nunca", "1": "Até 2 dias", ... })
    r1: JsonObject;   r2: JsonObject;   r3: JsonObject;
    r4: JsonObject;   r5: JsonObject;   r6: JsonObject;
    r7: JsonObject;   r8: JsonObject;   r9: JsonObject;
    r10: JsonObject;  // Pergunta 10 tem opções diferentes das outras

    versao: number;  // Número da versão deste questionário (ex: 1)
}