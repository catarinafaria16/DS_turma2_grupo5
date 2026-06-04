/*
 * ============================================================
 * avaliacaoCarat.entity.ts — Tabela de modelos do questionário CARAT
 * ============================================================
 *
 * Esta entidade guarda o MODELO (template) do questionário CARAT —
 * ou seja, o texto das perguntas e as opções de resposta disponíveis.
 *
 * Esta tabela NÃO guarda as respostas dos utentes (essas estão em RespostaCarat).
 * Guarda apenas a estrutura do questionário, permitindo futuras versões.
 *
 * Atualmente existe apenas a versão 1 do questionário CARAT,
 * que é inserida automaticamente na base de dados quando o servidor arranca.
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AvaliacaoCarat {

    // Identificador único desta versão do questionário (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // Data em que esta versão do questionário foi criada no sistema
    @CreateDateColumn()
    data_criacao!: Date;

    // Texto da pergunta 1: "Nariz entupido?"
    @Column('text')
    q1!: string;

    // Texto da pergunta 2: "Espirros?"
    @Column('text')
    q2!: string;

    // Texto da pergunta 3: "Comichão no nariz?"
    @Column('text')
    q3!: string;

    // Texto da pergunta 4: "Corrimento/pingo do nariz?"
    @Column('text')
    q4!: string;

    // Texto da pergunta 5: "Falta de ar/dispneia?"
    @Column('text')
    q5!: string;

    // Texto da pergunta 6: "Chiadeira no peito/pieira?"
    @Column('text')
    q6!: string;

    // Texto da pergunta 7: "Aperto no peito com esforço físico?"
    @Column('text')
    q7!: string;

    // Texto da pergunta 8: "Cansaço/dificuldade em fazer atividades do dia-a-dia?"
    @Column('text')
    q8!: string;

    // Texto da pergunta 9: "Acordou durante a noite por causa das doenças alérgicas?"
    @Column('text')
    q9!: string;

    // Texto da pergunta 10: "Aumentou a utilização de medicamentos?"
    @Column('text')
    q10!: string;

    // Opções de resposta para a pergunta 1 (guardadas em formato JSON)
    // Ex: { 0: "Nunca", 1: "Até 2 dias por semana", ... }
    @Column({ type: 'simple-json' })
    r1!: object;

    // Opções de resposta para a pergunta 2
    @Column({ type: 'simple-json' })
    r2!: object;

    // Opções de resposta para a pergunta 3
    @Column({ type: 'simple-json' })
    r3!: object;

    // Opções de resposta para a pergunta 4
    @Column({ type: 'simple-json' })
    r4!: object;

    // Opções de resposta para a pergunta 5
    @Column({ type: 'simple-json' })
    r5!: object;

    // Opções de resposta para a pergunta 6
    @Column({ type: 'simple-json' })
    r6!: object;

    // Opções de resposta para a pergunta 7
    @Column({ type: 'simple-json' })
    r7!: object;

    // Opções de resposta para a pergunta 8
    @Column({ type: 'simple-json' })
    r8!: object;

    // Opções de resposta para a pergunta 9
    @Column({ type: 'simple-json' })
    r9!: object;

    // Opções de resposta para a pergunta 10 (tem opções diferentes das outras)
    @Column({ type: 'simple-json' })
    r10!: object;

    // Número da versão deste questionário (atualmente versão 1)
    @Column('int')
    versao!: number;
}
