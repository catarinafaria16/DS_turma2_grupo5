/*
 * ============================================================
 * respostaCarat.entity.ts — Tabela de respostas ao questionário CARAT
 * ============================================================
 *
 * Esta entidade guarda as respostas de um utente a um questionário CARAT
 * realizado numa determinada data. Cada preenchimento do questionário
 * gera um novo registo nesta tabela.
 *
 * O CARAT tem 10 perguntas:
 *   - Q1 a Q4: sintomas nasais (rinite)
 *   - Q5 a Q9: sintomas de asma
 *   - Q10: uso de medicamentos de resgate
 *
 * O score total (0-30) é calculado automaticamente e classificado:
 *   - Score alto = doença mal controlada
 *   - Score baixo = doença bem controlada
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RespostaCarat1a9 } from '../enums/RespostaCarat1a9.enum.js';
import { RespostaCarat10 } from '../enums/RespostaCarat10.enum.js';

@Entity()
export class RespostaCarat {

    // Identificador único deste preenchimento do questionário (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID do modelo de avaliação CARAT usado (permite suportar versões futuras do questionário)
    @Column('int')
    avaliacao_id!: number;

    // ID do utente que respondeu ao questionário
    @Column('int')
    utente_id!: number;

    // Data e hora em que o questionário foi preenchido
    @Column('datetime')
    data_avaliacao!: Date;

    // Resposta à pergunta 1: "Nariz entupido?" (0=Nunca ... 3=Quase todos os dias)
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r1!: RespostaCarat1a9;

    // Resposta à pergunta 2: "Espirros?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r2!: RespostaCarat1a9;

    // Resposta à pergunta 3: "Comichão no nariz?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r3!: RespostaCarat1a9;

    // Resposta à pergunta 4: "Corrimento/pingo do nariz?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r4!: RespostaCarat1a9;

    // Resposta à pergunta 5: "Falta de ar/dispneia?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r5!: RespostaCarat1a9;

    // Resposta à pergunta 6: "Chiadeira no peito/pieira?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r6!: RespostaCarat1a9;

    // Resposta à pergunta 7: "Aperto no peito com esforço físico?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r7!: RespostaCarat1a9;

    // Resposta à pergunta 8: "Cansaço/dificuldade em fazer as suas atividades?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r8!: RespostaCarat1a9;

    // Resposta à pergunta 9: "Acordou durante a noite por causa das doenças alérgicas?"
    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r9!: RespostaCarat1a9;

    // Resposta à pergunta 10: "Aumentou o uso de medicamentos?" — tem opções diferentes das outras
    @Column({ type: 'simple-enum', enum: RespostaCarat10 })
    r10!: RespostaCarat10;

    // Pontuação total do questionário (soma de todas as respostas, de 0 a 30)
    // Quanto mais alto, pior o controlo da doença
    @Column('int')
    score_total!: number;

    // Classificação textual do score (ex: "Bom controlo", "Controlo insuficiente")
    @Column('text')
    interpretacao!: string;

    // Recomendação gerada automaticamente pelo sistema com base no score
    @Column({ type: 'text' })
    recomendacao_automatica!: string;
}
