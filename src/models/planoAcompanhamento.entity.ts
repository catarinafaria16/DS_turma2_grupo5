/*
 * ============================================================
 * planoAcompanhamento.entity.ts — Tabela de planos de acompanhamento
 * ============================================================
 *
 * Esta entidade representa o plano de acompanhamento clínico definido
 * pelo médico para um utente. É um documento que estabelece:
 *   - Com que frequência o utente deve ser reavaliado
 *   - Durante quanto tempo dura o acompanhamento
 *   - Que recomendações médicas devem ser seguidas
 *
 * Exemplo: "Utente com asma moderada — consulta mensal durante 6 meses,
 * medir CARAT a cada consulta, manter inalador de manutenção"
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';

@Entity()
export class PlanoAcompanhamento {

    // Identificador único do plano (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID do médico que criou e é responsável por este plano
    @Column('int')
    medico_id!: number;

    // ID do utente a quem o plano se destina
    @Column('int')
    utente_id!: number;

    // Com que regularidade o utente deve ser avaliado (ex: "Mensal", "Trimestral")
    @Column('text')
    frequencia_avaliacao!: string;

    // Data em que o plano começa a ser aplicado
    @Column({ type: 'date' })
    data_inicio!: Date;

    // Data em que o plano termina ou deve ser reavaliado
    @Column({ type: 'date' })
    data_fim!: Date;

    // Estado do plano: ATIVO, CONCLUIDO ou SUSPENSO
    @Column({ type: 'simple-enum', enum: EstadoPlanoAcompanhamento })
    estado!: EstadoPlanoAcompanhamento;

    // Indicações e recomendações clínicas do médico para este utente
    @Column({ type: 'text' })
    recomendacao_medica!: string;
}
