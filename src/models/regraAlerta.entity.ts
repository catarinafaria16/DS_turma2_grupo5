/*
 * ============================================================
 * regraAlerta.entity.ts — Tabela de regras automáticas de alertas
 * ============================================================
 *
 * Esta entidade define regras que o sistema verifica automaticamente
 * para gerar alertas clínicos. Funciona como um "sistema de vigilância"
 * que monitoriza os dados e notifica quando algo merece atenção.
 *
 * Exemplos de regras:
 *   - "Se score CARAT do utente X baixar abaixo de 16, gerar alerta de prioridade ALTA"
 *   - "Se score deteriorar mais de 5 pontos entre avaliações, gerar alerta"
 *
 * As regras podem ser criadas por médicos (para utentes específicos)
 * ou por administradores (para toda a população de utentes).
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { CategoriaRegraAlerta } from '../enums/CategoriaRegraAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';

@Entity()
export class RegraAlerta {

    // Identificador único desta regra (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID do médico que criou esta regra (opcional — pode ser null se foi o admin)
    @Column({ type: 'int', nullable: true })
    medico_id?: number;

    // ID do administrador que criou esta regra (opcional — pode ser null se foi o médico)
    @Column({ type: 'int', nullable: true })
    administrador_id?: number;

    // ID do utente a que esta regra se aplica (opcional — null significa que se aplica a todos)
    @Column({ type: 'int', nullable: true })
    utente_id?: number;

    // Categoria/tipo da regra: define o que a regra monitoriza (ex: SCORE_CARAT, MEDICACAO)
    @Column({ type: 'simple-enum', enum: CategoriaRegraAlerta })
    categoria!: CategoriaRegraAlerta;

    // Score CARAT mínimo — se o score do utente ficar abaixo deste valor, gera alerta
    // (opcional — só se aplica a regras baseadas em score)
    @Column({ type: 'int', nullable: true })
    limiar_score?: number;

    // Quantidade máxima de deterioração permitida entre avaliações consecutivas
    // Se o score piorar mais do que este valor, gera alerta
    @Column({ type: 'int', nullable: true })
    valor_deterioracao?: number;

    // Prioridade dos alertas gerados por esta regra: BAIXA, MEDIA, ALTA ou CRITICA
    @Column({ type: 'simple-enum', enum: PrioridadeRegraAlerta })
    prioridade!: PrioridadeRegraAlerta;

    // Data em que esta regra foi criada no sistema
    @CreateDateColumn()
    data_criacao!: Date;

    // Data de eliminação lógica — a regra pode ser desativada sem ser apagada permanentemente
    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
