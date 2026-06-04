/*
 * CreateRespostaCaratDto — Dados necessários para submeter um questionário CARAT
 *
 * Este DTO define os campos que devem ser enviados quando um utente preenche
 * o questionário CARAT (POST /api/respostas-carat).
 *
 * O score é calculado automaticamente pelo servidor — não é enviado pelo cliente.
 * O servidor também gera a interpretação e recomendação automaticamente.
 *
 * Todas as 10 respostas são obrigatórias.
 */
import { RespostaCarat1a9 } from '../../enums/RespostaCarat1a9.enum.js';
import { RespostaCarat10 } from '../../enums/RespostaCarat10.enum.js';

export interface CreateRespostaCaratDto {
    avaliacao_id: number;     // ID da versão do questionário (normalmente 1)
    utente_id: number;        // ID do utente que está a responder

    // Respostas às perguntas 1-9 (frequência de sintomas)
    // 0=Nunca, 1=Até2dias, 2=Mais2dias, 3=QuaseTodos
    r1: RespostaCarat1a9;    // Nariz entupido?
    r2: RespostaCarat1a9;    // Espirros?
    r3: RespostaCarat1a9;    // Comichão no nariz?
    r4: RespostaCarat1a9;    // Corrimento nasal?
    r5: RespostaCarat1a9;    // Falta de ar?
    r6: RespostaCarat1a9;    // Chiadeira no peito?
    r7: RespostaCarat1a9;    // Aperto no peito com esforço?
    r8: RespostaCarat1a9;    // Cansaço nas atividades diárias?
    r9: RespostaCarat1a9;    // Acordou de noite por causa das doenças?

    // Resposta à pergunta 10 (uso de medicamentos de resgate)
    // 0=NãoToma, 1=Nunca, 2=Menos7dias, 3=7ouMaisDias
    r10: RespostaCarat10;    // Aumentou uso de medicamentos?
}