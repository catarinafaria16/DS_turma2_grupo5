/*
 * ============================================================
 * data-source.ts — Configuração da ligação à base de dados
 * ============================================================
 *
 * Este ficheiro define como a aplicação se liga à base de dados SQLite.
 * SQLite é uma base de dados simples que guarda tudo num único ficheiro
 * ("database.db") — é ideal para desenvolvimento e projetos de pequena escala.
 *
 * O TypeORM é a ferramenta que faz a "ponte" entre o código TypeScript e a
 * base de dados: permite fazer consultas sem escrever SQL manualmente.
 *
 * A lista de "entities" (entidades) diz ao TypeORM quais são as tabelas
 * da base de dados — cada entidade corresponde a uma tabela.
 */

// DataSource: representa a ligação à base de dados
import { DataSource } from 'typeorm';
import { Administrador } from '../models/administrador.entity.js';
import { Alergia } from '../models/alergia.entity.js';
import { Alerta } from '../models/alerta.entity.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Auditoria } from '../models/auditoria.entity.js';
import { AvaliacaoCarat } from '../models/avaliacaoCarat.entity.js';
import { Comorbidade } from '../models/comorbidade.entity.js';
import { Exame } from '../models/exame.entity.js';
import { Medicacao } from '../models/medicacao.entity.js';
import { MedicacaoHabitual } from '../models/medicacaoHabitual.entity.js';
import { Medico } from '../models/medico.entity.js';
import { PlanoAcompanhamento } from '../models/planoAcompanhamento.entity.js';
import { Prescricao } from '../models/prescricao.entity.js';
import { RegraAlerta } from '../models/regraAlerta.entity.js';
import { RespostaCarat } from '../models/respostaCarat.entity.js';
import { Sintoma } from '../models/sintoma.entity.js';
import { Utente } from '../models/utente.entity.js';
import { Utilizador } from '../models/utilizador.entity.js';

// AppDataSource: objeto de ligação à base de dados — usado em toda a aplicação
export const AppDataSource = new DataSource({
    type: 'sqlite',         // Tipo de base de dados: SQLite (ficheiro local)
    database: 'database.db', // Nome do ficheiro onde os dados são guardados
    synchronize: true,       // Auto-cria/altera tabelas baseado nas entidades (apenas para desenvolvimento!)
    logging: true,           // Mostra as queries SQL no terminal (útil para depuração)
    entities: [              // Lista de todas as tabelas (entidades) da base de dados
        Administrador,
        Alergia,
        Alerta,
        Anamnese,
        Auditoria,
        AvaliacaoCarat,
        Comorbidade,
        Exame,
        Medicacao,
        MedicacaoHabitual,
        Medico,
        PlanoAcompanhamento,
        Prescricao,
        RegraAlerta,
        RespostaCarat,
        Sintoma,
        Utente,
        Utilizador
    ],
    subscribers: [],
    migrations: [],
});