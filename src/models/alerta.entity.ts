/*
 * ============================================================
 * alerta.entity.ts — Tabela de alertas clínicos
 * ============================================================
 *
 * Esta entidade representa alertas gerados no sistema para chamar a atenção
 * do médico sobre algo relevante no estado clínico de um utente.
 *
 * Os alertas podem ser gerados automaticamente por regras (ex: "se pontuação
 * CARAT baixar abaixo de X, gerar alerta") ou manualmente pelo médico.
 *
 * Cada alerta tem um estado (PENDENTE, RESOLVIDO, etc.) e uma prioridade
 * (BAIXA, MEDIA, ALTA, CRITICA) que indica a urgência da situação.
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TipoAlerta } from '../enums/TipoAlerta.enum.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';

@Entity()
export class Alerta {

    // Identificador único do alerta (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID do utente a que este alerta diz respeito
    @Column('int')
    utente_id!: number;

    // ID do médico responsável — é quem deve tomar ação sobre este alerta
    @Column('int')
    medico_id!: number;

    // ID da regra de alerta que gerou este alerta (opcional — pode ser null se criado manualmente)
    @Column({ type: 'int', nullable: true })
    regra_id?: number;

    // Tipo de alerta: classifica o que causou o alerta (ex: MEDICACAO, EXAME, CARAT)
    @Column({ type: 'simple-enum', enum: TipoAlerta })
    tipo!: TipoAlerta;

    // Estado atual do alerta: PENDENTE (por resolver) ou RESOLVIDO
    @Column({ type: 'simple-enum', enum: EstadoAlerta })
    estado!: EstadoAlerta;

    // Prioridade/urgência do alerta: BAIXA, MEDIA, ALTA ou CRITICA
    @Column({ type: 'simple-enum', enum: PrioridadeRegraAlerta })
    prioridade!: PrioridadeRegraAlerta;

    // Notas adicionais sobre o alerta (campo opcional)
    @Column({ type: 'text', nullable: true })
    notas?: string;

    // @CreateDateColumn: data preenchida automaticamente quando o alerta é criado
    @CreateDateColumn()
    data_criacao!: Date;

    // Data e hora da última alteração de estado do alerta
    @Column({ type: 'datetime' })
    data_atualizacao_estado!: Date;
}
